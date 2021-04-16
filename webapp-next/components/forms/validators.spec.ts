/* eslint-env jest */
import { email, url } from './validators'

describe('Email validator', () => {
  test('should validate email', () => {
    const result = email('test@test.com')
    expect(result).toEqual(undefined)
  })
  test('should validate empty email', () => {
    const result = email(undefined)
    expect(result).toEqual(undefined)
  })
  test('should not validate a bad email', () => {
    const result = email('test@test')
    expect(result).toEqual('Invalid email')
  })
})

describe('URL validator', () => {
  test('should validate url', () => {
    const result = url('https://conference-hall.io')
    expect(result).toEqual(undefined)
  })
  test('should validate empty url', () => {
    const result = url(undefined)
    expect(result).toEqual(undefined)
  })
  test('should not validate a bad url', () => {
    const result = url('foo-bar')
    expect(result).toEqual('Invalid URL')
  })
})
