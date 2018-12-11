// const { getEvent } = require('../../firestore/event')
// const { isUserEvent } = require('../../firestore/permissions')
// const { exportEventData } = require('../../firestore/exports')

module.exports = async (req, res) => {
  const { eventId } = req.params

  res.send(`Hello ${req.user.name}: ${req.user.uid} for ${eventId} with ${req.query}`)

  // const event = await getEvent(eventId)

  // // check user permissions on event (owner & organization)
  // const hasAccess = await isUserEvent(context.auth.uid, event)
  // if (!hasAccess) {
  //   throw new Error(`Permission denied on event ${eventId}`)
  // TODO check error codes for cloud functions
  // }

  // const eventJson = await exportEventData(event, filters, {
  //   event: ['id', 'name', 'categories', 'formats'],
  //   proposal: [
  //     'id',
  //     'title',
  //     'state',
  //     'level',
  //     'abstract',
  //     'categories',
  //     'formats',
  //     'speakers',
  //     'comments',
  //   ],
  //   speaker: ['uid', 'displayName', 'bio', 'company', 'photoURL', 'twitter', 'github'],
  // })

  // return eventJson
}
