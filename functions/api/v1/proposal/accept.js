const { fetchProposal, updateProposal } = require('../../../firestore/proposal')

module.exports = async (req, res) => {
  const { eventId, proposalId } = req.params

  try {
    const proposal = await fetchProposal(eventId, proposalId)
    const newProposal = { ...proposal, state: 'accepted' }

    await updateProposal(eventId, newProposal)

    return res.json({ result: `Proposal with ID ${newProposal.id} is now accepted.` })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
    return res.status(500).end()
  }
}
