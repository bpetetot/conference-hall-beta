import { EventPatch } from './EventPatch'
import { executeValidation } from '../../middleware/validation'

describe('validation | EventPatch', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      params: { eventId: '1' },
      body: {
        name: 'name',
        description: 'description',
        visibility: 'PUBLIC',
        address: 'address',
        lat: '47.218371',
        lng: '47.218371',
        timezone: 'timezone',
        contact: 'contact@example.net',
        website: 'https://website.com',
        conferenceStart: '2021-02-26T23:00:00.000Z',
        conferenceEnd: '2021-02-26T23:00:00.000Z',
        archived: false,
        organizationId: 1,
        cfpStart: '2021-02-26T23:00:00.000Z',
        cfpEnd: '2021-02-26T23:00:00.000Z',
        maxProposals: 2,
        formatsRequired: true,
        categoriesRequired: true,
        bannerUrl: 'https://banner.com',
        deliberationEnabled: true,
        displayOrganizersRatings: true,
        displayProposalsRatings: true,
        displayProposalsSpeakers: true,
        emailOrganizer: 'organizer@example.net',
        emailNotifications: {},
        surveyEnabled: true,
        surveyQuestions: {},
        slackWebhookUrl: 'https://banner.com',
        slackNotifSubmitted: true,
        apiKey: 'XXX',
      },
    }
    // when
    const errors = await executeValidation(EventPatch, request)
    // then
    expect(errors.mapped()).toEqual({})
    expect(request.body.lat).toEqual(47.218371)
    expect(request.body.lng).toEqual(47.218371)
    expect(request.body.conferenceStart).toEqual(new Date('2021-02-26T23:00:00.000Z'))
    expect(request.body.conferenceEnd).toEqual(new Date('2021-02-26T23:00:00.000Z'))
  })

  test('should fail when contact is not an email', async () => {
    // given
    const request = {
      body: {
        name: 'name',
        description: 'description',
        visibility: 'PUBLIC',
        contact: 'contact',
      },
    }
    // when
    const errors = await executeValidation(EventPatch, request)
    // then
    expect(errors.mapped()).toHaveProperty('contact')
  })

  test('should fail when website is not an URL', async () => {
    // given
    const request = {
      body: {
        name: 'name',
        description: 'description',
        visibility: 'PUBLIC',
        website: 'website',
      },
    }
    // when
    const errors = await executeValidation(EventPatch, request)
    // then
    expect(errors.mapped()).toHaveProperty('website')
  })
})
