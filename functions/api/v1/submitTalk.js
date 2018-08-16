const { omit } = require('lodash')
const { getTalk, updateTalk } = require('../../firestore/talk')
const { addProposal } = require('../../firestore/proposal')

const isSubmitted = (talk, eventId) => {
  if (talk && talk.submissions) {
    return !!talk.submissions[eventId]
  }
  return false
}

module.exports = (req, res) => {
  const { eventId, talkId } = req.params

  getTalk(talkId).then((talk) => {
    if (isSubmitted(talk, eventId)) {
      res.send({ message: 'talk already submitted' })
    } else {
      const submittedTalk = Object.assign({ id: talkId }, omit(talk, ['createTimestamp', 'submissions']))

      updateTalk(talkId, { [`submissions.${eventId}`]: submittedTalk })
        .then(() => addProposal(eventId, submittedTalk))
        .then(() => res.send({ message: 'talk submitted' }))
    }
  })
}
