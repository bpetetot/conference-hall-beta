const { getOrganization } = require('./organization')

const isUserEvent = async (uid, event) => {
  const { owner, organization } = event

  if (owner === uid) return true

  if (!organization) return false

  const { members } = await getOrganization(organization)

  return !!members[uid]
}

module.exports = {
  isUserEvent,
}
