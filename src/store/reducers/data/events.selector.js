/**
 * Return the format
 * @param {string} eventId event id
 * @param {string} formatId format id
 */
export const getFormat = (eventId, formatId) => (store) => {
  const { formats } = store.data.events.get(eventId) || {}
  if (formats) {
    return formats.find((f) => f.id === formatId)
  }
  return undefined
}

/**
 * Return the category
 * @param {string} eventId event id
 * @param {string} categoryId category id
 */
export const getCategory = (eventId, categoryId) => (store) => {
  const { categories } = store.data.events.get(eventId) || {}
  if (categories) {
    return categories.find((c) => c.id === categoryId)
  }
  return undefined
}
