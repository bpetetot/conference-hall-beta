import { Event, Proposal, User } from '@prisma/client'
import { buildEvent } from '../../tests/builder/event'
import { buildProposal } from '../../tests/builder/proposal'
import { buildTalk } from '../../tests/builder/talk'
import { buildUser } from '../../tests/builder/user'
import { setupDatabase } from '../../tests/helpers/setup-services'
import {
  sendProposalsDeliberationEmails,
  sendSubmitTalkEmailToOrganizers,
  sendSubmitTalkEmailToSpeakers,
} from './email.services'

import { sendEmail } from './mailgun'
jest.mock('./mailgun', () => ({ sendEmail: jest.fn(), isEmailServiceEnabled: () => true }))
const sendEmailMock = <jest.Mock>sendEmail

describe('Email services', () => {
  describe('#sendSubmitTalkEmailToSpeakers', () => {
    beforeEach(() => {
      sendEmailMock.mockReset()
    })

    it('should call sendEmail to one speaker', async () => {
      //given
      const event = { name: 'event1' } as Event
      const speaker1 = { email: 'speaker1@example.com' }
      const proposal = { title: 'talk', speakers: [speaker1] } as Proposal & { speakers: User[] }

      // when
      await sendSubmitTalkEmailToSpeakers(event, proposal)

      // then
      const result = sendEmailMock.mock.calls[0][0]
      expect(result.from).toEqual('event1 <no-reply@conference-hall.io>')
      expect(result.to).toEqual(['speaker1@example.com'])
      expect(result.subject).toEqual('[event1] Talk submitted')
      expect(result.html).toContain('Submission confirmed')
      expect(result.html).toContain(
        'Your talk <strong>"talk"</strong> has been successfully submitted',
      )
    })

    it('should call sendEmail to several speakers', async () => {
      //given
      const event = { name: 'event1' } as Event
      const speaker1 = { email: 'speaker1@example.com' }
      const speaker2 = { email: 'speaker2@example.com' }
      const proposal = { speakers: [speaker1, speaker2] } as Proposal & { speakers: User[] }

      // when
      await sendSubmitTalkEmailToSpeakers(event, proposal)

      // then
      const result = sendEmailMock.mock.calls[0][0]
      expect(result.to).toEqual(['speaker1@example.com', 'speaker2@example.com'])
    })

    it('should display the survey if its enabled', async () => {
      //given
      const event = { name: 'event1', surveyEnabled: true } as Event
      const speaker1 = { email: 'speaker1@example.com' }
      const proposal = { speakers: [speaker1] } as Proposal & { speakers: User[] }

      // when
      await sendSubmitTalkEmailToSpeakers(event, proposal)

      // then
      const result = sendEmailMock.mock.calls[0][0]
      expect(result.html).toContain('The speaker survey')
    })
  })

  describe('#sendSubmitTalkEmailToOrganizers', () => {
    beforeEach(() => {
      sendEmailMock.mockReset()
    })

    it('should not send email if no contact given', async () => {
      //given
      const event = { name: 'event1' } as Event
      const proposal = {} as Proposal & { speakers: User[] }

      // when
      await sendSubmitTalkEmailToOrganizers(event, proposal)

      // then
      expect(sendEmailMock).toHaveBeenCalledTimes(0)
    })

    it('should call sendEmail to event contact email', async () => {
      //given
      const event = { name: 'event1', contact: 'contact@example.com' } as Event
      const proposal = {} as Proposal & { speakers: User[] }

      // when
      await sendSubmitTalkEmailToOrganizers(event, proposal)

      // then
      const result = sendEmailMock.mock.calls[0][0]
      expect(result.from).toEqual('event1 <no-reply@conference-hall.io>')
      expect(result.to).toEqual(['contact@example.com'])
      expect(result.subject).toEqual('[event1] Talk received')
      expect(result.html).toContain('New proposal')
    })
  })

  describe('#sendProposalsDeliberationEmails', () => {
    let user1: User
    let user2: User
    let event: Event
    let proposal1: Proposal
    let proposal2: Proposal
    let proposal3: Proposal

    setupDatabase()

    beforeEach(async () => {
      sendEmailMock.mockReset()
      user1 = await buildUser()
      user2 = await buildUser()
      event = await buildEvent(user1, { name: 'event1' })
      const talk1 = await buildTalk(user1)
      const talk2 = await buildTalk(user2)
      const talk3 = await buildTalk(user1)
      const talk4 = await buildTalk(user1)
      proposal1 = await buildProposal(event.id, talk1, { status: 'ACCEPTED' })
      proposal2 = await buildProposal(event.id, talk2, { status: 'ACCEPTED' })
      proposal3 = await buildProposal(event.id, talk3, { status: 'REJECTED' })
      await buildProposal(event.id, talk4)
    })

    it('should send accepted proposals', async () => {
      // when
      await sendProposalsDeliberationEmails(user1.id, event, { status: 'ACCEPTED' })

      // then
      expect(sendEmailMock).toHaveBeenCalledTimes(1)
      const result = sendEmailMock.mock.calls[0][0]
      expect(result.from).toEqual('event1 <no-reply@conference-hall.io>')
      expect(result.to).toEqual([user1.email, user2.email])
      expect(result.bcc).toEqual([event.contact])
      expect(result.subject).toEqual(
        `[event1] [Action required] Talk accepted! Please confirm your presence`,
      )
      expect(result.html).toContain('Your talk has been accepted')
      expect(result['recipient-variables']).toEqual({
        [user1.email || '']: {
          speakerName: user1.name,
          proposalId: proposal1.id,
          talkId: proposal1.talkId,
          talkTitle: proposal1.title,
        },
        [user2.email || '']: {
          speakerName: user2.name,
          proposalId: proposal2.id,
          talkId: proposal2.talkId,
          talkTitle: proposal2.title,
        },
      })
    })

    it('should send rejected proposals', async () => {
      // when
      await sendProposalsDeliberationEmails(user1.id, event, { status: 'REJECTED' })

      // then
      expect(sendEmailMock).toHaveBeenCalledTimes(1)
      const result = sendEmailMock.mock.calls[0][0]
      expect(result.from).toEqual('event1 <no-reply@conference-hall.io>')
      expect(result.to).toEqual([user1.email])
      expect(result.bcc).toEqual([event.contact])
      expect(result.subject).toEqual('[event1] Talk declined')
      expect(result.html).toContain('Your talk has been declined')
      expect(result['recipient-variables']).toEqual({
        [user1.email || '']: {
          speakerName: user1.name,
          proposalId: proposal3.id,
          talkId: proposal3.talkId,
          talkTitle: proposal3.title,
        },
      })
    })

    it('should send accepted and rejected proposals', async () => {
      // when
      await sendProposalsDeliberationEmails(user1.id, event, {})

      // then
      expect(sendEmailMock).toHaveBeenCalledTimes(2)

      const acceptedCall = sendEmailMock.mock.calls[0][0]
      expect(acceptedCall.to).toEqual([user1.email, user2.email])
      expect(acceptedCall.html).toContain('Your talk has been accepted')

      const rejectedCall = sendEmailMock.mock.calls[1][0]
      expect(rejectedCall.to).toEqual([user1.email])
      expect(rejectedCall.html).toContain('Your talk has been declined')
    })
  })
})
