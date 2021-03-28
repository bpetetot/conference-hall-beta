import { Prisma, Event, User, EventCategory, EventFormat, Proposal } from '@prisma/client'
import { isEmpty } from 'lodash'
import fetch from 'node-fetch'
import config from '../config'

function buildMessage(
  event: Event,
  proposal: Proposal & { speakers: User[]; categories: EventCategory[]; formats: EventFormat[] },
) {
  const attachment = {
    fallback: `New Talk submitted to ${event.name}`,
    pretext: `*New talk submitted to ${event.name}*`,
    author_name: `by ${proposal.speakers.map((s) => s.name).join(' & ')}`,
    title: proposal.title,
    text: proposal.abstract,
    title_link: `${config.WEBAPP_DOMAIN}/organizer/event/${event.id}/proposal/${proposal.id}`,
    thumb_url: proposal.speakers[0].photoURL,
    color: '#ffab00',
    fields: [] as unknown[],
  }

  if (!isEmpty(proposal.categories)) {
    attachment.fields.push({
      title: 'Categories',
      value: proposal.categories.map((c) => c.name).join(' & '),
      short: true,
    })
  }

  if (!isEmpty(proposal.formats)) {
    attachment.fields.push({
      title: 'Formats',
      value: proposal.formats.map((c) => c.name).join(' & '),
      short: true,
    })
  }

  return {
    attachments: [attachment],
  }
}

export async function sendSubmittedTalkSlackMessage(
  event: Event,
  proposal: Proposal & { speakers: User[]; categories: EventCategory[]; formats: EventFormat[] },
) {
  const notifications = event?.slackNotifications as Prisma.JsonObject
  if (!event.slackWebhookUrl || !notifications?.submitted) {
    return
  }
  const message = buildMessage(event, proposal)
  try {
    await fetch(event.slackWebhookUrl, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
  }
}
