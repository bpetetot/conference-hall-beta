const functions = require('firebase-functions')
const { fetchProposal } = require('../firestore/proposal')
const { partialUpdateTalk } = require('../firestore/talk')

module.exports.rsvp = functions.https.onRequest(async (req, res) => {
  const { eventId, talkId, value } = req.query
  if (eventId && talkId && value) {
    const proposal = await fetchProposal(eventId, talkId)
    if (proposal) {
      if (value === 'yes') {
        const newTalk = {
          ...proposal,
          submissions: {
            [eventId]: {
              state: 'confirmed',
            },
          },
        }
        partialUpdateTalk(talkId, newTalk)
        return res.json({ result: `Talk with Id: ${newTalk.id} is confirmed by speaker.` })
      }
      if (value === 'no') {
        const newTalk = {
          ...proposal,
          submissions: {
            [eventId]: {
              state: 'declined',
            },
          },
        }
        partialUpdateTalk(talkId, newTalk)
        return res.json({ result: `talk with Id: ${newTalk.id} is declined by speaker.` })
      }
    }
    return res.json({ result: `talk with Id: ${talkId} not found.` })
  }
  return res.json({ result: 'Not enough query prarameters for confirmation.' })
})
