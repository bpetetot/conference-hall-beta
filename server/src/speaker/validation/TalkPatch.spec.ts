import { TalkPatch } from './TalkPatch'
import { executeValidation } from '../../middleware/validation'

describe('validation | TalkPatch', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      params: {
        id: '1',
      },
      body: {
        title: 'title',
        abstract: 'abstract',
        level: 'level',
        language: 'language',
        references: 'references',
        archived: true,
      },
    }
    // when
    const errors = await executeValidation(TalkPatch, request)
    // then
    expect(errors.mapped()).toEqual({})
    expect(request.params.id).toEqual(1)
    expect(request.body.archived).toEqual(true)
  })

  test('should fail when id is not a number', async () => {
    // given
    const request = {
      params: {
        id: 'abc',
      },
      body: {
        title: 'title',
        abstract: 'abstract',
      },
    }
    // when
    const errors = await executeValidation(TalkPatch, request)
    // then
    expect(errors.mapped()).toHaveProperty('id')
  })

  test('should fail when id is not defined', async () => {
    // given
    const request = {
      body: {
        title: 'title',
        abstract: 'abstract',
      },
    }
    // when
    const errors = await executeValidation(TalkPatch, request)
    // then
    expect(errors.mapped()).toHaveProperty('id')
  })
})
