import { EventPost } from './EventPost'
import { executeValidation } from '../../middleware/validation'

describe('validation | EventPost', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      body: {
        name: 'name',
        description: 'description',
        type: 'CONFERENCE',
        visibility: 'PUBLIC',
        address: 'address',
        lat: '47.218371',
        lng: '47.218371',
        timezone: 'timezone',
        contact: 'contact@example.net',
        website: 'https://website.com',
        conferenceStart: '2021-02-26T23:00:00.000Z',
        conferenceEnd: '2021-02-26T23:00:00.000Z',
      },
    }
    // when
    const errors = await executeValidation(EventPost, request)
    // then
    expect(errors.mapped()).toEqual({})
    expect(request.body.lat).toEqual(47.218371)
    expect(request.body.lng).toEqual(47.218371)
    expect(request.body.conferenceStart).toEqual(new Date('2021-02-26T23:00:00.000Z'))
    expect(request.body.conferenceEnd).toEqual(new Date('2021-02-26T23:00:00.000Z'))
  })

  test('should fail when name is not defined', async () => {
    // given
    const request = {
      body: {
        description: 'description',
        type: 'CONFERENCE',
        visibility: 'PUBLIC',
      },
    }
    // when
    const errors = await executeValidation(EventPost, request)
    // then
    expect(errors.mapped()).toHaveProperty('name')
  })

  test('should fail when description is not defined', async () => {
    // given
    const request = {
      body: {
        name: 'name',
        type: 'CONFERENCE',
        visibility: 'PUBLIC',
      },
    }
    // when
    const errors = await executeValidation(EventPost, request)
    // then
    expect(errors.mapped()).toHaveProperty('description')
  })

  test('should fail when type is not defined', async () => {
    // given
    const request = {
      body: {
        name: 'name',
        description: 'description',
        visibility: 'PUBLIC',
      },
    }
    // when
    const errors = await executeValidation(EventPost, request)
    // then
    expect(errors.mapped()).toHaveProperty('type')
  })

  test('should fail when visibility is not defined', async () => {
    // given
    const request = {
      body: {
        name: 'name',
        description: 'description',
        type: 'CONFERENCE',
      },
    }
    // when
    const errors = await executeValidation(EventPost, request)
    // then
    expect(errors.mapped()).toHaveProperty('visibility')
  })

  test('should fail when contact is not an email', async () => {
    // given
    const request = {
      body: {
        name: 'name',
        description: 'description',
        type: 'CONFERENCE',
        visibility: 'PUBLIC',
        contact: 'contact',
      },
    }
    // when
    const errors = await executeValidation(EventPost, request)
    // then
    expect(errors.mapped()).toHaveProperty('contact')
  })

  test('should fail when website is not an URL', async () => {
    // given
    const request = {
      body: {
        name: 'name',
        description: 'description',
        type: 'CONFERENCE',
        visibility: 'PUBLIC',
        website: 'website',
      },
    }
    // when
    const errors = await executeValidation(EventPost, request)
    // then
    expect(errors.mapped()).toHaveProperty('website')
  })
})
