const { updateEvents } = require('./helpers/updates')

const main = async () => {
  await updateEvents(async () => ({
    sendEmailsTo: {
      contact: true,
      organizers: true,
    },
    emails: {
      submitted: true,
      accepted: true,
      rejected: true,
      confirmed: true,
      declined: true,
    },
  }))
}

main()
