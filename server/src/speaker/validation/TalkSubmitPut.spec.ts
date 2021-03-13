import { TalkSubmitPut } from './TalkSubmitPut'
import { executeValidation } from '../../middleware/validation'

describe('validation | TalkSubmitPut', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      params: {
        talkId: '1',
        eventId: '2',
      },
      body: {
        comments: 'comments',
        formats: [1, 2],
        categories: [1, 2],
      },
    }
    // when
    const errors = await executeValidation(TalkSubmitPut, request)
    // then
    expect(errors.mapped()).toEqual({})
  })

  test('should fail when formats is not an array of integers', async () => {
    // given
    const request = {
      params: {
        talkId: '1',
        eventId: '2',
      },
      body: {
        formats: ['1', '2'],
      },
    }
    // when
    const errors = await executeValidation(TalkSubmitPut, request)
    // then
    expect(errors.mapped()).toHaveProperty('formats')
  })

  test('should fail when categories is not an array of integers', async () => {
    // given
    const request = {
      params: {
        talkId: '1',
        eventId: '2',
      },
      body: {
        categories: ['1', '2'],
      },
    }
    // when
    const errors = await executeValidation(TalkSubmitPut, request)
    // then
    expect(errors.mapped()).toHaveProperty('categories')
  })
})
