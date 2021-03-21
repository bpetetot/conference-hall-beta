import { UserMePatch } from './UserMePatch'
import { executeValidation } from '../../middleware/validation'

describe('validation | UserMePatch', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      body: {
        email: 'email@email.com',
        name: 'name',
        bio: 'bio',
        photoURL: 'http://url.com',
        betaAccess: 'betaAccess',
        github: 'github',
        company: 'company',
        language: 'language',
        references: 'references',
        twitter: 'twitter',
        address: 'address',
        lat: '47.218371',
        lng: '47.218371',
        timezone: 'timezone',
      },
    }
    // when
    const errors = await executeValidation(UserMePatch, request)
    // then
    expect(errors.mapped()).toEqual({})
    expect(request.body.lat).toEqual(47.218371)
    expect(request.body.lng).toEqual(47.218371)
  })

  test('should fail when email is invalid', async () => {
    // given
    const request = {
      body: {
        email: 'email',
      },
    }
    // when
    const errors = await executeValidation(UserMePatch, request)
    // then
    expect(errors.mapped()).toHaveProperty('email')
  })

  test('should fail when photoURL is invalid', async () => {
    // given
    const request = {
      body: {
        photoURL: 'photoURL',
      },
    }
    // when
    const errors = await executeValidation(UserMePatch, request)
    // then
    expect(errors.mapped()).toHaveProperty('photoURL')
  })
})
