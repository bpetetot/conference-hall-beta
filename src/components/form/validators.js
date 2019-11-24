/* eslint-disable import/prefer-default-export */
import isEmpty from 'lodash/isEmpty'

export const required = value => {
  if (!value || isEmpty(value)) {
    return 'Required'
  }
  return undefined
}
