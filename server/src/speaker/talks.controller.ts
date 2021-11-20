import { Request } from 'express'
import { SpeakerTalkDto } from '../dtos/SpeakerTalk.dto'
import * as talksRepository from '../db/talks.repository'
import * as usersRepository from '../db/users.repository'
import * as eventRepository from '../db/events.repository'
import * as proposalRepository from '../db/proposals.repository'
import * as inviteRepository from '../db/invites.repository'
import * as emailServices from '../emails/email.services'
import * as slackServices from '../slack/slack.services'
import { HttpException } from '../middleware/error'
import { checkUser } from '../users/users.controller'
import { isCfpOpened } from '../common/cfp-dates'
import { isEmpty } from 'lodash'
import { InviteType, ProposalStatus } from '.prisma/client'
import { InviteDto } from '../dtos/Invite.dto'

export async function findUserTalks(req: Request) {
  const { uid } = req.user
  const talks = await talksRepository.findUserTalks(uid)
  return talks?.map((talk) => new SpeakerTalkDto(talk))
}

export async function createTalk(req: Request) {
  const user = await checkUser(req.user.uid)
  const talk = await talksRepository.createTalk(user?.id, req.body)
  return new SpeakerTalkDto(talk)
}

export async function getTalk(req: Request) {
  const { uid } = req.user
  const { id } = req.params
  const talkId = parseInt(id)

  const talk = await talksRepository.getTalk(talkId, {
    withSpeakers: true,
    withProposals: true,
  })
  if (!talk) {
    throw new HttpException(404, 'Talk not found')
  }
  const isSpeaker = talk?.speakers.some((speaker) => speaker.uid === uid)
  if (!isSpeaker) {
    throw new HttpException(403, 'Forbidden')
  }
  return new SpeakerTalkDto(talk)
}

export async function updateTalk(req: Request) {
  const { uid } = req.user
  const talkId = parseInt(req.params.id)

  const talk = await talksRepository.getTalk(talkId, { withSpeakers: true })
  if (!talk) {
    throw new HttpException(404, 'Talk not found')
  }
  const isSpeaker = talk.speakers.some((speaker) => speaker.uid === uid)
  if (!isSpeaker) {
    throw new HttpException(403, 'Forbidden')
  }
  await talksRepository.updateTalk(talkId, req.body)
}

export async function deleteTalk(req: Request) {
  const { uid } = req.user
  const talkId = parseInt(req.params.id)

  const talk = await talksRepository.getTalk(talkId, { withSpeakers: true })
  if (!talk) {
    throw new HttpException(404, 'Talk not found')
  }
  const isSpeaker = talk.speakers.some((speaker) => speaker.uid === uid)
  if (!isSpeaker) {
    throw new HttpException(403, 'Forbidden')
  }
  await talksRepository.deleteTalk(talkId)
}

export async function addSpeakerToTalk(req: Request) {
  const { uid } = req.user
  const talkId = parseInt(req.params.talkId)
  const speakerId = parseInt(req.params.speakerId)

  const talk = await talksRepository.getTalk(talkId, { withSpeakers: true })
  if (!talk) {
    throw new HttpException(404, 'Talk not found')
  }
  const speaker = await usersRepository.getUser(speakerId)
  if (!speaker) {
    throw new HttpException(404, 'Speaker not found')
  }
  const isUserSpeaker = talk.speakers.some((speaker) => speaker.uid === uid)
  if (!isUserSpeaker) {
    throw new HttpException(403, 'Forbidden')
  }
  const isAlreadySpeaker = talk.speakers.some((speaker) => speaker.id === speakerId)
  if (isAlreadySpeaker) {
    throw new HttpException(409, 'Speaker already attached to the talk')
  }
  await talksRepository.updateTalk(talkId, {
    speakers: { connect: [{ id: speakerId }] },
  })
}

export async function removeSpeakerFromTalk(req: Request) {
  const { uid } = req.user
  const talkId = parseInt(req.params.talkId)
  const speakerId = parseInt(req.params.speakerId)

  const talk = await talksRepository.getTalk(talkId, { withSpeakers: true })
  if (!talk) {
    throw new HttpException(404, 'Talk not found')
  }
  const isUserSpeaker = talk.speakers.some((speaker) => speaker.uid === uid)
  if (!isUserSpeaker) {
    throw new HttpException(403, 'Forbidden')
  }
  const existsSpeaker = talk.speakers.some((speaker) => speaker.id === speakerId)
  if (!existsSpeaker) {
    throw new HttpException(409, 'Speaker does not belong to the talk')
  }
  await talksRepository.updateTalk(talkId, {
    speakers: { disconnect: [{ id: speakerId }] },
  })
}

export async function submitTalk(req: Request) {
  const { uid } = req.user
  const talkId = parseInt(req.params.talkId)
  const eventId = parseInt(req.params.eventId)

  const user = await usersRepository.getUserByUid(uid)
  if (!user) {
    throw new HttpException(404, 'User not found')
  }

  const talk = await talksRepository.getTalk(talkId, { withSpeakers: true })
  if (!talk) {
    throw new HttpException(404, 'Talk not found')
  }
  const isUserSpeaker = talk.speakers.some((speaker) => speaker.uid === uid)
  if (!isUserSpeaker) {
    throw new HttpException(403, 'Forbidden')
  }

  const event = await eventRepository.getEventById(eventId)
  if (!event) {
    throw new HttpException(404, 'Event not found')
  }
  if (!isCfpOpened(event.type, event.cfpStart, event.cfpEnd)) {
    throw new HttpException(403, 'CFP is closed')
  }
  if (event.formatsRequired && isEmpty(req.body.formats)) {
    throw new HttpException(400, 'Formats are required for the event')
  }
  if (event.categoriesRequired && isEmpty(req.body.categories)) {
    throw new HttpException(400, 'Categories are required for the event')
  }

  const proposals = await proposalRepository.findUserProposalsForEvent(eventId, user.id)
  const proposal = proposals.find((p) => p.talkId === talkId)

  let formats, categories
  if (req.body?.formats && req.body?.formats.length > 0) {
    formats = req.body?.formats?.filter(Boolean).map((id: number) => ({ id }))
  }
  if (req.body?.categories && req.body?.categories.length > 0) {
    categories = req.body?.categories?.filter(Boolean).map((id: number) => ({ id }))
  }

  if (proposal) {
    await proposalRepository.updateProposal(proposal.id, {
      title: talk.title,
      abstract: talk.abstract,
      level: talk.level,
      languages: talk.languages || undefined,
      references: talk.references,
      comments: req.body.comments,
      speakers: {
        set: [],
        connect: talk.speakers.map((s) => ({ id: s.id })),
      },
      formats: {
        set: [],
        connect: formats,
      },
      categories: {
        set: [],
        connect: categories,
      },
    })
  } else if (!!event.maxProposals && proposals.length === event.maxProposals) {
    throw new HttpException(403, 'Max proposals reached')
  } else {
    const proposal = await proposalRepository.createProposal(talkId, eventId, {
      title: talk.title,
      abstract: talk.abstract,
      level: talk.level,
      languages: talk.languages || undefined,
      references: talk.references,
      comments: req.body.comments,
      speakers: {
        connect: talk.speakers.map((s) => ({ id: s.id })),
      },
      formats: {
        connect: formats,
      },
      categories: {
        connect: categories,
      },
    })

    await emailServices.sendSubmitTalkEmailToSpeakers(event, proposal)
    await emailServices.sendSubmitTalkEmailToOrganizers(event, proposal)
    await slackServices.sendSubmittedTalkSlackMessage(event, proposal)
  }
}

export async function unsubmitTalk(req: Request) {
  const { uid } = req.user
  const talkId = parseInt(req.params.talkId)
  const eventId = parseInt(req.params.eventId)

  const user = await usersRepository.getUserByUid(uid)
  if (!user) {
    throw new HttpException(404, 'User not found')
  }

  const talk = await talksRepository.getTalk(talkId, { withSpeakers: true })
  if (!talk) {
    throw new HttpException(404, 'Talk not found')
  }
  const isUserSpeaker = talk.speakers.some((speaker) => speaker.uid === uid)
  if (!isUserSpeaker) {
    throw new HttpException(403, 'Forbidden')
  }

  const event = await eventRepository.getEventById(eventId)
  if (!event) {
    throw new HttpException(404, 'Event not found')
  }
  if (!isCfpOpened(event.type, event.cfpStart, event.cfpEnd)) {
    throw new HttpException(403, 'CFP is closed')
  }

  const proposal = await proposalRepository.getProposalForEvent(talkId, eventId)
  if (!proposal) {
    throw new HttpException(404, 'Proposal not found')
  }

  await proposalRepository.deleteProposal(proposal.id)
}

export async function confirmTalk(req: Request) {
  const { uid } = req.user
  const talkId = parseInt(req.params.talkId)
  const eventId = parseInt(req.params.eventId)

  const user = await usersRepository.getUserByUid(uid)
  if (!user) {
    throw new HttpException(404, 'User not found')
  }

  const talk = await talksRepository.getTalk(talkId, { withSpeakers: true })
  if (!talk) {
    throw new HttpException(404, 'Talk not found')
  }
  const isUserSpeaker = talk.speakers.some((speaker) => speaker.uid === uid)
  if (!isUserSpeaker) {
    throw new HttpException(403, 'Forbidden')
  }

  const event = await eventRepository.getEventById(eventId)
  if (!event) {
    throw new HttpException(404, 'Event not found')
  }

  const proposal = await proposalRepository.getProposalForEvent(talkId, eventId)
  if (!proposal) {
    throw new HttpException(404, 'Proposal not found')
  }
  if (proposal.status !== ProposalStatus.ACCEPTED) {
    throw new HttpException(409, 'Proposal cannot be confirmed')
  }
  if (req.body.confirmed) {
    await proposalRepository.updateProposal(proposal.id, { status: ProposalStatus.CONFIRMED })
    await emailServices.sendConfirmTalkEmailToOrganizers(event, proposal)
  } else {
    await proposalRepository.updateProposal(proposal.id, { status: ProposalStatus.DECLINED })
    await emailServices.sendDeclineTalkEmailToOrganizers(event, proposal)
  }
}

export async function getTalkInvitation(req: Request) {
  const { uid } = req.user
  const talkId = parseInt(req.params.talkId)

  const user = await usersRepository.getUserByUid(uid)
  if (!user) {
    throw new HttpException(404, 'User not found')
  }
  const talk = await talksRepository.getTalk(talkId, { withSpeakers: true })
  if (!talk) {
    throw new HttpException(404, 'Talk not found')
  }
  const isUserSpeaker = talk.speakers.some((speaker) => speaker.uid === uid)
  if (!isUserSpeaker) {
    throw new HttpException(403, 'Forbidden')
  }
  const invite = await inviteRepository.getInviteForEntity(InviteType.SPEAKER, talkId)
  if (!invite) return
  return new InviteDto(invite)
}

export async function createInvitationLink(req: Request) {
  const { uid } = req.user
  const talkId = parseInt(req.params.talkId)

  const user = await usersRepository.getUserByUid(uid)
  if (!user) {
    throw new HttpException(404, 'User not found')
  }
  const talk = await talksRepository.getTalk(talkId, { withSpeakers: true })
  if (!talk) {
    throw new HttpException(404, 'Talk not found')
  }
  const isUserSpeaker = talk.speakers.some((speaker) => speaker.uid === uid)
  if (!isUserSpeaker) {
    throw new HttpException(403, 'Forbidden')
  }
  const invite = await inviteRepository.createInvite(InviteType.SPEAKER, talkId, user.id)
  return new InviteDto(invite)
}

export async function revokeInvitationLink(req: Request) {
  const { uid } = req.user
  const talkId = parseInt(req.params.talkId)

  const user = await usersRepository.getUserByUid(uid)
  if (!user) {
    throw new HttpException(404, 'User not found')
  }
  const talk = await talksRepository.getTalk(talkId, { withSpeakers: true })
  if (!talk) {
    throw new HttpException(404, 'Talk not found')
  }
  const isUserSpeaker = talk.speakers.some((speaker) => speaker.uid === uid)
  if (!isUserSpeaker) {
    throw new HttpException(403, 'Forbidden')
  }
  await inviteRepository.deleteInvite(InviteType.SPEAKER, talkId)
}
