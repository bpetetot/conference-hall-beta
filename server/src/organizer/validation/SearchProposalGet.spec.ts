import { SearchProposalGet } from './SearchProposalGet'
import { executeValidation } from '../../middleware/validation'

describe('validation | SearchProposalGet', () => {
  test('should pass when all fields are valid', async () => {
    // given
    const request = {
      params: { eventId: '1' },
      query: {
        search: 'hello',
        status: 'SUBMITTED',
        ratings: 'rated',
        format: '1',
        category: '1',
        sort: 'newest',
        page: '1',
        pageSize: '1',
      },
    }
    // when
    const errors = await executeValidation(SearchProposalGet, request)
    // then
    expect(errors.mapped()).toEqual({})
    expect(request.params.eventId).toEqual(1)
    expect(request.query.search).toEqual('hello')
    expect(request.query.status).toEqual('SUBMITTED')
    expect(request.query.ratings).toEqual('rated')
    expect(request.query.format).toEqual(1)
    expect(request.query.category).toEqual(1)
    expect(request.query.sort).toEqual('newest')
    expect(request.query.page).toEqual(1)
    expect(request.query.pageSize).toEqual(1)
  })
})
