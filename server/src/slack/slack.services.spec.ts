/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch'
import { sendSubmittedTalkSlackMessage } from './slack.services'

const fetchMock = <jest.Mock>(fetch as unknown)

describe('Slack services', () => {
  it('should not send a Slack message if Slack integration not enabled for event', async () => {
    // given
    const event: any = {}
    const proposal: any = {}

    // when
    await sendSubmittedTalkSlackMessage(event, proposal)

    // then
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('should not send a Slack message if Slack notification for submitted talk not enabled', async () => {
    // given
    const event: any = {
      slackWebhookUrl: 'http://webhook.slack',
      slackNotifications: { submitted: false },
    }
    const proposal: any = {}

    // when
    await sendSubmittedTalkSlackMessage(event, proposal)

    // then
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('should send a Slack message for submitted talk', async () => {
    // given
    const event: any = {
      id: 1,
      name: 'Event',
      slackWebhookUrl: 'http://webhook.slack',
      slackNotifications: { submitted: true },
    }

    const proposal: any = {
      id: 2,
      title: 'Title',
      abstract: 'Abstract',
      speakers: [{ name: 'Speaker 1', photoUrl: 'http://photo' }, { name: 'Speaker 2' }],
      formats: [{ name: 'Format 1' }, { name: 'Format 2' }],
      categories: [{ name: 'Category 1' }, { name: 'Category 2' }],
    }

    // when
    await sendSubmittedTalkSlackMessage(event, proposal)

    // then
    expect(fetchMock).toHaveBeenCalledWith('http://webhook.slack', {
      body: '{"attachments":[{"fallback":"New Talk submitted to Event","pretext":"*New talk submitted to Event*","author_name":"by Speaker 1 & Speaker 2","title":"Title","text":"Abstract","title_link":"http://localhost:3000/organizer/event/1/proposal/2","color":"#ffab00","fields":[{"title":"Categories","value":"Category 1 & Category 2","short":true},{"title":"Formats","value":"Format 1 & Format 2","short":true}]}]}',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  })
})
