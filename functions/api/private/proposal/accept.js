const { getEvent } = require('../../../firestore/event')
const { isUserEvent } = require('../../../firestore/permissions')
const { fetchProposal, updateProposal } = require('../../../firestore/proposal')

module.exports = async (req, res) => {
  const { eventId, proposalId } = req.params
  const { uid } = req.user

  const event = await getEvent(eventId)

  // check user permissions on event (owner & organization)
  const hasAccess = await isUserEvent(uid, event)
  if (!hasAccess) {
    res.status(401).send({ error: `Permission denied on event ${eventId}` })
  }

  try {
    const proposal = await fetchProposal(eventId, proposalId)
    const newProposal = { ...proposal, state: 'accepted' }

    await updateProposal(eventId, newProposal)

    return res.json({ result: `Proposal with Id: ${newProposal.id} is now accepted.` })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
    return res.status(500).end()
  }
}
