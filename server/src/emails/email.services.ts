import { Prisma, Event, Proposal, ProposalStatus, User } from '@prisma/client'
import { isEmailServiceEnabled, sendEmail } from './mailgun'
import * as proposalsRepository from '../db/proposals.repository'
import {
  proposalBatchAccepted,
  proposalBatchRejected,
  proposalReceived,
  proposalSubmitted,
} from './templates'

type BatchRecipients = {
  [key: string]: {
    speakerName: string
    talkTitle: string
    talkId: string
    proposalId: string
  }
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
  return sendEmail({
    from: `${event.name} <no-reply@conference-hall.io>`,
    to: proposal.speakers.map((s) => s.email),
    subject: `[${event.name}] Talk submitted`,
    html: proposalSubmitted(event, proposal),
  })
}

export async function sendSubmitTalkEmailToOrganizers(
  event: Event,
  proposal: Proposal & { speakers: User[] },
) {
  if (!hasEmailNotification(event, 'submitted')) return
  return sendEmail({
    from: `${event.name} <no-reply@conference-hall.io>`,
    to: [event.emailOrganizer],
    subject: `[${event.name}] Talk received`,
    html: proposalReceived(event, proposal),
  })
}

async function sendBatchAcceptedEmails(event: Event, recipients: BatchRecipients) {
  const emails = Object.keys(recipients)
  if (emails.length === 0) return
  const bcc = hasEmailNotification(event, 'accepted') ? [event.emailOrganizer] : []
  return sendEmail({
    from: `${event.name} <no-reply@conference-hall.io>`,
    to: emails,
    bcc,
    subject: `[${event.name}] [Action required] Talk accepted! Please confirm your presence`,
    html: proposalBatchAccepted(event),
    'recipient-variables': recipients,
    'mailgun-variables': {
      'v:type': 'deliberation_email',
      'v:proposalId': '%recipient.proposalId%',
    },
  })
}

async function sendBatchRejectedEmails(event: Event, recipients: BatchRecipients) {
  const emails = Object.keys(recipients)
  if (emails.length === 0) return
  const bcc = hasEmailNotification(event, 'rejected') ? [event.emailOrganizer] : []
  return sendEmail({
    from: `${event.name} <no-reply@conference-hall.io>`,
    to: emails,
    bcc,
    subject: `[${event.name}] Talk declined`,
    html: proposalBatchRejected(event),
    'recipient-variables': recipients,
    'mailgun-variables': {
      'v:type': 'deliberation_email',
      'v:proposalId': '%recipient.proposalId%',
    },
  })
}

export async function sendProposalsDeliberationEmails(
  userId: number,
  event: Event,
  filters: proposalsRepository.ProposalsFilters,
) {
  if (!isEmailServiceEnabled()) return

  const proposalsStream = proposalsRepository.streamEventProposals(userId, event.id, filters, {
    batchSize: 20,
  })

  let acceptedRecipents: BatchRecipients = {}
  let rejectedRecipents: BatchRecipients = {}

  for await (const proposal of proposalsStream) {
    const speakers: BatchRecipients = {}
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
