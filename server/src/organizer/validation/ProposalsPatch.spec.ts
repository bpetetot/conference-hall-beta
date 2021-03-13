import { ProposalsPatch } from './ProposalsPatch'
import { executeValidation } from '../../middleware/validation'

describe('validation | ProposalsPatch', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      params: { eventId: '1' },
      body: {
        filters: {
          search: 'hello',
          status: 'SUBMITTED',
          ratings: 'rated',
          format: '1',
          category: '1',
          exceptItems: [],
          selectedItems: [],
        },
        data: {
          status: 'ACCEPTED',
        },
      },
    }
    // when
    const errors = await executeValidation(ProposalsPatch, request, false)
    // then
    expect(errors.mapped()).toEqual({})
    expect(request.params.eventId).toEqual(1)
    expect(request.body.filters.search).toEqual('hello')
    expect(request.body.filters.status).toEqual('SUBMITTED')
    expect(request.body.filters.ratings).toEqual('rated')
    expect(request.body.filters.format).toEqual(1)
    expect(request.body.filters.category).toEqual(1)
    expect(request.body.filters.exceptItems).toEqual([])
    expect(request.body.filters.selectedItems).toEqual([])
    expect(request.body.data.status).toEqual('ACCEPTED')
  })
})
