import { DateTime } from 'luxon'

const MEDIUM_FORMAT = 'DDD ZZZZ'
const LONG_FORMAT = 'fff'

/**
 * Format a date
 * @param {Date} date date to format
 * @param {String} size medium or large
 * @param {String} timezone display timezone
 */
export const formatDate = (date, size, timezone = 'local') => {
  if (!date) return undefined
  const dateInTimezone = DateTime.fromJSDate(date).setZone(timezone)

  switch (size) {
    case 'large':
      return dateInTimezone.setLocale('en').toFormat(LONG_FORMAT)
    case 'medium':
    default:
      return dateInTimezone.setLocale('en').toFormat(MEDIUM_FORMAT)
  }
}