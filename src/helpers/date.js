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

/**
 * Date to a timestamp epoch
 * @param {Date} date instance of Date
 */
export const dateToTimestamp = date => Number.parseInt(date.getTime() / 1000, 10)
