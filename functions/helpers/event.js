const { get, isEmpty } = require('lodash')
const { getEventOrganizers } = require('../firestore/event')

const getEmailRecipients = async (event, settings, emailType) => {
  let cc
  let bcc

  const isActive = get(settings, `notifications.emails.${emailType}`, false)
  if (!isActive) return {}

  const isOrganizersRecipients = get(settings, 'notifications.recipients.organizers', false)
  if (isOrganizersRecipients) {
    const organizers = await getEventOrganizers(event)
    bcc = organizers.map(user => user.email)
  }

  const isContactRecipients = get(settings, 'notifications.recipients.contact', false)
  if (isContactRecipients && event.contact) {
    cc = [event.contact]
  }

  return { cc, bcc }
}

const getFormat = (id, event) => {
  if (isEmpty(event.formats) || !id) {
    return null
  }
  return event.formats.find(f => f.id === id)
}

const getCategory = (id, event) => {
  if (isEmpty(event.categories) || !id) {
    return null
  }
  return event.categories.find(c => c.id === id)
}

module.exports = {
  getEmailRecipients,
  getFormat,
  getCategory,
}
