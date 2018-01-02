import format from 'date-fns/format'

/**
 * Large date formatting
 * @param {Date} date date to format
 */
export const lgf = (date) => {
  if (!date) return undefined
  return format(date, 'dddd Do MMMM YYYY')
}

/**
 * Medium date formatting
 * @param {Date} date date to format
 */
export const mdf = (date) => {
  if (!date) return undefined
  return format(date, 'MMM. Do YYYY')
}
