const SMALL_FORMAT = { year: 'numeric', month: 'short', day: 'numeric' }
const MEDIUM_FORMAT = { year: 'numeric', month: 'long', day: 'numeric' }
const LARGE_FORMAT = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}

/**
 * Format a date
 * @param {Date} date date to format
 * @param {String} size small, medium or large
 */
export const formatDate = (date, size) => {
  if (!date) return undefined

  switch (size) {
    case 'small':
      return date.toLocaleDateString(undefined, SMALL_FORMAT)
    case 'large':
      return date.toLocaleDateString(undefined, LARGE_FORMAT)
    case 'medium':
    default:
      return date.toLocaleDateString(undefined, MEDIUM_FORMAT)
  }
}
