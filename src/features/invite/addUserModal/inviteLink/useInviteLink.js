import { useState, useEffect } from 'react'

import invites, { fetchInviteByType } from 'firebase/invites'

const createInviteLink = (inviteId) => {
  if (!inviteId) return null
  return `${window.location.origin}/invite/${inviteId}`
}

export default ({ entity, entityId, entityTitle, uid }) => {
  const [inviteId, setInviteId] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInviteByType(entity, entityId)
      .then((result) => {
        if (!result) {
          setInviteId(null)
          setLoading(false)
        } else {
          setInviteId(result.docs[0].id)
          setLoading(false)
        }
      })
      .catch(() => {
        setInviteId(null)
        setLoading(false)
      })
  }, [])

  const generate = async () => {
    setLoading(true)
    const invite = { entity, entityId, entityTitle, creator: uid }
    const ref = await invites.create(invite)
    setInviteId(ref.id)
    setLoading(false)
  }

  const revoke = () => {
    setLoading(true)
    invites.delete(inviteId)
    setInviteId(null)
    setLoading(false)
  }

  return {
    generate,
    revoke,
    loading,
    inviteLink: createInviteLink(inviteId),
  }
}
