import { useState, useEffect } from 'react'

import invites, { fetchInviteByType } from 'firebase/invites'

const createInviteLink = (inviteId, entity) => {
  if (!inviteId) return null
  return `${window.location.origin}/invite/${entity}/${inviteId}`
}

export default (entity, entityId, entityTitle, uid) => {
  const [inviteId, setInviteId] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInviteByType(entity, entityId)
      .then(result => {
        if (!result.length) {
          setInviteId(null)
          setLoading(false)
        }
        return setInviteId(result.docs[0].id)
      })
      .then(data => {
        if (data) setInviteId('invite')
        setLoading(false)
      })
      .catch(() => {
        setInviteId(null)
        setLoading(false)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
    inviteLink: createInviteLink(inviteId, entity),
  }
}
