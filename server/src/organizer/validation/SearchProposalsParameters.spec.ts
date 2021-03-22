import { SearchProposalsParameters } from './SearchProposalsParameters'
import { executeValidation } from '../../middleware/validation'

describe('validation | SearchProposalsParameters', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      params: { eventId: '1' },
      body: {
        search: 'hello',
        status: 'SUBMITTED',
        ratings: 'rated',
        format: '1',
        category: '1',
        exceptItems: [],
        selectedItems: [],
      },
    }
    // when
    const errors = await executeValidation(SearchProposalsParameters, request)
    // then
    expect(errors.mapped()).toEqual({})
    expect(request.params.eventId).toEqual(1)
    expect(request.body.search).toEqual('hello')
    expect(request.body.status).toEqual('SUBMITTED')
    expect(request.body.ratings).toEqual('rated')
    expect(request.body.format).toEqual(1)
    expect(request.body.category).toEqual(1)
    expect(request.body.exceptItems).toEqual([])
    expect(request.body.selectedItems).toEqual([])
  })
})
