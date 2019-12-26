import isEmpty from 'lodash/isEmpty'
import isEmail from 'validator/lib/isEmail'
import isURL from 'validator/lib/isURL'

export const required = value => {
  if (!value || isEmpty(value)) {
    return 'Required'
  }
  return undefined
}

export const email = value => {
  if (value && isEmail(value)) return undefined
  return 'Invalid email'
}

export const url = value => {
  if (value && isURL(value)) return undefined
  return 'Invalid URL'
}

export const validate = validators => value => {
  for (let i = 0; i < validators.length; i += 1) {
    const result = validators[i](value)
    if (result) return result
  }
  return undefined
}
