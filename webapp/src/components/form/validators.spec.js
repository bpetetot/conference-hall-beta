/* eslint-env jest */
import { required, email, url, validate } from './validators'

describe('components/validators', () => {
  it('should validate to Required', () => {
    const result = required('hello')
    expect(result).toEqual(undefined)
  })
  it('should not validate to Required', () => {
    const result = required(undefined)
    expect(result).toEqual('Required')
  })
  it('should validate email', () => {
    const result = email('test@test.com')
    expect(result).toEqual(undefined)
  })
  it('should not validate email', () => {
    const result = email('test@test')
    expect(result).toEqual('Invalid email')
  })
  it('should validate url', () => {
    const result = url('https://conference-hall.io')
    expect(result).toEqual(undefined)
  })
  it('should not validate url', () => {
    const result = url('foo-bar')
    expect(result).toEqual('Invalid URL')
  })
  it('should validate a list of validators', () => {
    const validators = [required, email]

    const result = validate(validators)(undefined)
    expect(result).toEqual('Required')

    const result2 = validate(validators)('foo')
    expect(result2).toEqual('Invalid email')

    const result3 = validate(validators)('test@test.com')
    expect(result3).toEqual(undefined)
  })
})
