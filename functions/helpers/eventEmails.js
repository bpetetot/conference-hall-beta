const { getEventOrganizers } = require('../firestore/event')

const isEmailNotificationActive = (event, emailType) => event.emails && !!event.emails[emailType]

const getEventEmails = async (event, emailType) => {
  let cc
  let bcc

  const isActive = isEmailNotificationActive(event, emailType)
  if (!isActive) return {}

  if (event.sendEmailsTo && event.sendEmailsTo.organizers) {
    const organizers = await getEventOrganizers(event)
    bcc = organizers.map(user => user.email)
  }
  if (event.sendEmailsTo && event.sendEmailsTo.contact) {
    cc = [event.contact]
  }

  return { cc, bcc }
}


module.exports = {
  getEventEmails,
}
