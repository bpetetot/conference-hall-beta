import { InviteType } from '.prisma/client'
import { Request } from 'express'
import * as inviteRepository from '../db/invites.repository'
import * as organizationRepository from '../db/organizations.repository'
import * as talkRepository from '../db/talks.repository'
import * as userRepository from '../db/users.repository'
import { InvitationInfoDto } from '../dtos/InvitationInfo.dto'
import { HttpException } from '../middleware/error'

export async function getInvitationInfo(req: Request) {
  const inviteUuid = req.params.inviteUuid
  const invite = await inviteRepository.getInvite(inviteUuid)
  if (!invite) {
    throw new HttpException(404, 'Invitation not found')
  }
  if (invite.type === InviteType.ORGANIZATION) {
    const organization = await organizationRepository.getOrganizationById(invite.entityId)
    if (!organization) {
      throw new HttpException(404, 'Organization not found')
    }
    return new InvitationInfoDto(invite, organization.name)
  }
  if (invite.type === InviteType.SPEAKER) {
    const talk = await talkRepository.getTalk(invite.entityId)
    if (!talk) {
      throw new HttpException(404, 'Talk not found')
    }
    return new InvitationInfoDto(invite, talk.title)
  }
}

export async function validateInvitation(req: Request) {
  const user = await userRepository.getUserByUid(req.user.uid)
  if (!user) {
    throw new HttpException(404, 'User not found')
  }
  const invite = await inviteRepository.getInvite(req.params.inviteUuid)
  if (!invite) {
    throw new HttpException(404, 'Invitation not found')
  }

  if (invite.type === InviteType.ORGANIZATION) {
    const organization = await organizationRepository.getOrganizationById(invite.entityId, {
      withMembers: true,
    })
    if (!organization) {
      throw new HttpException(404, 'Organization not found')
    }
    const alreadyMember = organization.members.some((m) => m.memberId === user.id)
    if (alreadyMember) {
      throw new HttpException(409, 'Already member of the organization')
    }
    await organizationRepository.addMember(organization.id, user?.id)
    if (!user.betaAccess) {
      await userRepository.updateUser(user.uid, { betaAccess: invite.invitedBy.betaAccess })
    }
    return
  }

  if (invite.type === InviteType.SPEAKER) {
    const talk = await talkRepository.getTalk(invite.entityId, { withSpeakers: true })
    if (!talk) {
      throw new HttpException(404, 'Talk not found')
    }
    const alreadySpeaker = talk.speakers.some((s) => s.uid === user.uid)
    if (alreadySpeaker) {
      throw new HttpException(409, 'Already speaker of the talk')
    }
    await talkRepository.updateTalk(talk.id, { speakers: { connect: [{ id: user.id }] } })
    return
  }
}
