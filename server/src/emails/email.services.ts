import { Prisma, Event, Proposal, ProposalStatus, User } from '@prisma/client'
import { getEmailProvider } from './providers/email'
import * as proposalsRepository from '../db/proposals.repository'
import {
  proposalBatchAccepted,
  proposalBatchRejected,
  proposalConfirmed,
  proposalDeclined,
  proposalReceived,
  proposalSubmitted,
} from './templates'

type RecipentsTalkVariables = {
  [key: string]: {
    speakerName: string
    talkTitle: string
    talkId: string
    proposalId: string
  }
}

export const provider = getEmailProvider()

const MAILGUN_DELIBERATION_VARS = {
  'v:type': 'deliberation_email',
  'v:proposalId': '%recipient.proposalId%',
}

function hasEmailNotification(event: Event, notification: string) {
  if (!event.emailOrganizer) return false
  const notifications = event?.emailNotifications as Prisma.JsonObject
  if (!notifications[notification]) return false
  return true
}

export async function sendSubmitTalkEmailToSpeakers(
  event: Event,
  proposal: Proposal & { speakers: User[] },
) {
  const emails = proposal.speakers.map((s) => s.email).filter((e): e is string => !!e)
  if (emails.length === 0) return

  return provider.sendEmail({
    from: `${event.name} <no-reply@conference-hall.io>`,
    to: emails,
    subject: `[${event.name}] Talk submitted`,
    html: proposalSubmitted(event, proposal),
  })
}

export async function sendSubmitTalkEmailToOrganizers(
  event: Event,
  proposal: Proposal & { speakers: User[] },
) {
  if (!hasEmailNotification(event, 'submitted') || !event.emailOrganizer) return

  return provider.sendEmail({
    from: `${event.name} <no-reply@conference-hall.io>`,
    to: [event.emailOrganizer],
    subject: `[${event.name}] Talk received`,
    html: proposalReceived(event, proposal),
  })
}

async function sendBatchAcceptedEmails(event: Event, recipients: RecipentsTalkVariables) {
  const emails = Object.keys(recipients)
  if (emails.length === 0) return
  const bcc =
    hasEmailNotification(event, 'accepted') && event.emailOrganizer ? [event.emailOrganizer] : []

  return provider.sendCustomEmail(
    {
      from: `${event.name} <no-reply@conference-hall.io>`,
      to: emails,
      bcc,
      subject: `[${event.name}] [Action required] Talk accepted! Please confirm your presence`,
      html: proposalBatchAccepted(event),
    },
    MAILGUN_DELIBERATION_VARS,
    recipients,
  )
}

async function sendBatchRejectedEmails(event: Event, recipients: RecipentsTalkVariables) {
  const emails = Object.keys(recipients)
  if (emails.length === 0) return
  const bcc =
    hasEmailNotification(event, 'rejected') && event.emailOrganizer ? [event.emailOrganizer] : []

  return provider.sendCustomEmail(
    {
      from: `${event.name} <no-reply@conference-hall.io>`,
      to: emails,
      bcc,
      subject: `[${event.name}] Talk declined`,
      html: proposalBatchRejected(event),
    },
    MAILGUN_DELIBERATION_VARS,
    recipients,
  )
}

export async function sendProposalsDeliberationEmails(
  userId: number,
  event: Event,
  filters: proposalsRepository.ProposalsFilters,
) {
  const proposalsStream = proposalsRepository.streamEventProposals(userId, event.id, filters)

  let acceptedRecipents: RecipentsTalkVariables = {}
  let rejectedRecipents: RecipentsTalkVariables = {}

  for await (const proposal of proposalsStream) {
    const speakers: RecipentsTalkVariables = {}
    for (const speaker of proposal.speakers) {
      if (speaker.email) {
        speakers[speaker.email] = {
          speakerName: speaker.name,
          talkTitle: proposal.title,
          talkId: proposal.talkId,
          proposalId: proposal.id,
        }
      }
    }

    if (proposal.status === ProposalStatus.ACCEPTED) {
      acceptedRecipents = { ...acceptedRecipents, ...speakers }
    } else if (proposal.status === ProposalStatus.REJECTED) {
      rejectedRecipents = { ...rejectedRecipents, ...speakers }
    }
  }

  await sendBatchAcceptedEmails(event, acceptedRecipents)
  await sendBatchRejectedEmails(event, rejectedRecipents)
}

export async function sendConfirmTalkEmailToOrganizers(event: Event, proposal: Proposal) {
  if (!hasEmailNotification(event, 'confirmed') || !event.emailOrganizer) return

  return provider.sendEmail({
    from: `${event.name} <no-reply@conference-hall.io>`,
    to: [event.emailOrganizer],
    subject: `[${event.name}] Talk confirmed by speaker`,
    html: proposalConfirmed(event, proposal),
  })
}

export async function sendDeclineTalkEmailToOrganizers(event: Event, proposal: Proposal) {
  if (!hasEmailNotification(event, 'confirmed') || !event.emailOrganizer) return

  return provider.sendEmail({
    from: `${event.name} <no-reply@conference-hall.io>`,
    to: [event.emailOrganizer],
    subject: `[${event.name}] Talk declined by speaker`,
    html: proposalDeclined(event, proposal),
  })
}
