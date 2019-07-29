/* eslint-disable no-console */
const fetch = require('node-fetch')
const { get, first } = require('lodash')

const url = 'https://hooks.slack.com/services/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'

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

const sendSlackMessage = async (event, talk, speakers, app) => {
  const message = buildMessage(event, talk, speakers, app)
  try {
    console.info('send slack message', message)
    await fetch(url, {
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
