import isEmail from 'validator/lib/isEmail'
import isURL from 'validator/lib/isURL'

export function email(value?: string) {
  if (!value) return undefined
  if (isEmail(value)) return undefined
  return 'Invalid email'
}

export function url(value?: string) {
  if (!value) return undefined
  if (isURL(value)) return undefined
  return 'Invalid URL'
}
