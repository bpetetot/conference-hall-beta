import { ProposalRatePut } from './ProposalRatePut'
import { executeValidation } from '../../middleware/validation'

describe('validation | ProposalRatePut', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      params: {
        eventId: '1',
        proposalId: '1',
      },
      body: {
        rating: '1',
        feeling: 'NEUTRAL',
      },
    }
    // when
    const errors = await executeValidation(ProposalRatePut, request)
    // then
    expect(errors.mapped()).toEqual({})
    expect(request.params.eventId).toEqual(1)
    expect(request.params.proposalId).toEqual(1)
  })
})
