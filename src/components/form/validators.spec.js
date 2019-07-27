/* eslint-env jest */
import { required } from './validators'

describe('components/validators', () => {
  it('should validate to Required', () => {
    const result = required('hello')
    expect(result).toEqual(undefined)
  })
  it('should validate to Required', () => {
    const result = required(undefined)
    expect(result).toEqual('Required')
  })
})
