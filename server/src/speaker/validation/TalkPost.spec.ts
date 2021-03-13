import { TalkPost } from './TalkPost'
import { executeValidation } from '../../middleware/validation'

describe('validation | TalkPost', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      body: {
        title: 'title',
        abstract: 'abstract',
        level: 'level',
        language: 'language',
        references: 'references',
      },
    }
    // when
    const errors = await executeValidation(TalkPost, request)
    // then
    expect(errors.mapped()).toEqual({})
  })

  test('should fail when title is not defined', async () => {
    // given
    const request = {
      body: {
        abstract: 'abstract',
      },
    }
    // when
    const errors = await executeValidation(TalkPost, request)
    // then
    expect(errors.mapped()).toHaveProperty('title')
  })

  test('should fail when abstract is not defined', async () => {
    // given
    const request = {
      body: {
        title: 'title',
      },
    }
    // when
    const errors = await executeValidation(TalkPost, request)
    // then
    expect(errors.mapped()).toHaveProperty('abstract')
  })
})
