/* eslint-env jest */
import { required } from './validators'

describe('components/validators', () => {
  it('should validate to Required', () => {
    const result = required(true)
    expect(result).toEqual(undefined)
  })
  it('should validate to Required', () => {
    const result = required(false)
    expect(result).toEqual('Required')
  })
})
