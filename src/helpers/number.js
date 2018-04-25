/* eslint-disable import/prefer-default-export */
import isNil from 'lodash/isNil'

export const displayRating = (rating) => {
  if (isNil(rating)) return '-'
  if (rating.toString().indexOf('.') !== -1) {
    return rating.toFixed(1)
  }
  return rating
}
