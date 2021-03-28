import { Request } from 'express'
import { InviteType, OrganizationRole, User } from '@prisma/client'
import { HttpException } from '../middleware/error'
import * as organizationsRepository from '../db/organizations.repository'
import * as inviteRepository from '../db/invites.repository'
import { checkUser } from '../users/users.controller'
import { OrganizationDto } from '../dtos/Organization.dto'
import { OrganizationMemberDto } from '../dtos/OrganizationMember.dto'
import { InviteDto } from '../dtos/Invite.dto'

export async function checkUserRole(
  user: User,
  organizationId: number,
  roles: OrganizationRole[] = [
    OrganizationRole.MEMBER,
    OrganizationRole.OWNER,
    OrganizationRole.REVIEWER,
  ],
) {
  const organization = await organizationsRepository.getOrganizationForUserRole(
    organizationId,
    user.id,
    roles,
  )
  if (!organization) {
    throw new HttpException(403, 'No sufficient permissions')
  }
  return organization
}

export async function getOrganization(req: Request) {
  const user = await checkUser(req.user.uid)
  const organizationId = parseInt(req.params.id)
  const organization = await checkUserRole(user, organizationId)
  return new OrganizationDto(organization)
}

export async function findOrganizations(req: Request) {
  const user = await checkUser(req.user.uid)
  const organizations = await organizationsRepository.findOrganizationsByUser(user.id)
  return organizations.map((organization) => new OrganizationDto(organization))
}

export async function createOrganization(req: Request) {
  const user = await checkUser(req.user.uid)
  const organization = await organizationsRepository.createOrganization(user.id, req.body)
  return new OrganizationDto(organization)
}

export async function updateOrganization(req: Request) {
  const user = await checkUser(req.user.uid)
  const organizationId = parseInt(req.params.id)
  await checkUserRole(user, organizationId, [OrganizationRole.OWNER])
  await organizationsRepository.updateOrganization(organizationId, req.body)
}

export async function findOrganizationMembers(req: Request) {
  const user = await checkUser(req.user.uid)
  const organizationId = parseInt(req.params.id)
  await checkUserRole(user, organizationId)
  const members = await organizationsRepository.findOrganizationMembers(organizationId)
  return members.map((member) => new OrganizationMemberDto(member))
}

export async function addMember(req: Request) {
  const user = await checkUser(req.user.uid)
  const organizationId = parseInt(req.params.id)
  const memberId = parseInt(req.params.memberId)
  await checkUserRole(user, organizationId, [OrganizationRole.OWNER])
  const member = await organizationsRepository.addMember(organizationId, memberId)
  return new OrganizationMemberDto(member)
}

export async function updateMember(req: Request) {
  const user = await checkUser(req.user.uid)
  const organizationId = parseInt(req.params.id)
  const memberId = parseInt(req.params.memberId)
  await checkUserRole(user, organizationId, [OrganizationRole.OWNER])
  await organizationsRepository.updateMemberRole(organizationId, memberId, req.body.role)
}

export async function deleteMember(req: Request) {
  const user = await checkUser(req.user.uid)
  const organizationId = parseInt(req.params.id)
  const memberId = parseInt(req.params.memberId)
  if (user.id === memberId) {
    await checkUserRole(user, organizationId, [OrganizationRole.MEMBER, OrganizationRole.REVIEWER])
  } else {
    await checkUserRole(user, organizationId, [OrganizationRole.OWNER])
  }
  await organizationsRepository.deleteMember(organizationId, memberId)
}

export async function getTalkInvitation(req: Request) {
  const user = await checkUser(req.user.uid)
  const organizationId = parseInt(req.params.id)
  await checkUserRole(user, organizationId, [OrganizationRole.OWNER])
  const invite = await inviteRepository.getInviteForEntity(InviteType.ORGANIZATION, organizationId)
  if (!invite) return
  return new InviteDto(invite)
}

export async function createInvitationLink(req: Request) {
  const user = await checkUser(req.user.uid)
  const organizationId = parseInt(req.params.id)
  await checkUserRole(user, organizationId, [OrganizationRole.OWNER])
  const invite = await inviteRepository.createInvite(
    InviteType.ORGANIZATION,
    organizationId,
    user.id,
  )
  return new InviteDto(invite)
}

export async function revokeInvitationLink(req: Request) {
  const user = await checkUser(req.user.uid)
  const organizationId = parseInt(req.params.id)
  await checkUserRole(user, organizationId, [OrganizationRole.OWNER])
  await inviteRepository.deleteInvite(InviteType.ORGANIZATION, organizationId)
}
