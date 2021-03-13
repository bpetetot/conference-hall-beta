import { SearchUsersCriterias } from './SearchUsersCriterias'
import { executeValidation } from '../../middleware/validation'

describe('validation | SearchUsersCriterias', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      query: {
        email: 'email@email.com',
      },
    }
    // when
    const errors = await executeValidation(SearchUsersCriterias, request)
    // then
    expect(errors.mapped()).toEqual({})
  })

  test('should fail when email is invalid', async () => {
    // given
    const request = {
      query: {
        email: 'email',
      },
    }
    // when
    const errors = await executeValidation(SearchUsersCriterias, request)
    // then
    expect(errors.mapped()).toHaveProperty('email')
  })
})
