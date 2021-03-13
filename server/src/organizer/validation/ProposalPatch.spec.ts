import { ProposalPatch } from './ProposalPatch'
import { executeValidation } from '../../middleware/validation'

describe('validation | ProposalPatch', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      params: {
        eventId: '1',
        proposalId: '1',
      },
      body: {
        title: 'title',
        abstract: 'abstract',
        level: 'level',
        language: 'language',
        status: 'SUBMITTED',
      },
    }
    // when
    const errors = await executeValidation(ProposalPatch, request)
    // then
    expect(errors.mapped()).toEqual({})
    expect(request.params.eventId).toEqual(1)
    expect(request.params.proposalId).toEqual(1)
  })
})
