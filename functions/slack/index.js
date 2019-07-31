/* eslint-disable no-console */
const fetch = require('node-fetch')
const { get, first } = require('lodash')

const isSlackEnabled = (settings, type) => {
  const { enabled, webhookUrl, notifications = {} } = get(settings, 'slack', {})
  return enabled && !!webhookUrl && !!notifications[type]
}

const buildMessage = (event, talk, speakers, app) => ({
  attachments: [
    {
      fallback: `New Talk submitted to ${event.name}`,
      pretext: `*New talk submitted to ${event.name}*`,
      author_name: `by ${speakers.map(s => s.displayName).join(' & ')}`,
      title: talk.title,
      text: talk.abstract,
      title_link: `${app.url}/organizer/event/${event.id}/proposal/${talk.id}`,
      thumb_url: get(first(speakers), 'photoURL'),
      color: '#ffab00',
    },
  ],
})

const sendSlackMessage = async (event, talk, speakers, settings, app, type) => {
  if (!isSlackEnabled(settings, type)) {
    return
  }

  const message = buildMessage(event, talk, speakers, app)
  try {
    console.info('send slack message', message)
    await fetch(settings.slack.webhookUrl, {
      method: 'post',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  sendSlackMessage,
}
