import { useState, useEffect, useCallback } from 'react'
import firebase from 'firebase/app'

import inviteReq from 'firebase/invites'

export default (inviteId, push) => {
  const [invitation, setInvitation] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    inviteReq.read(inviteId).then(ref => setInvitation(ref.data()))
  }, [inviteId])

  const validate = useCallback(async () => {
    setLoading(true)
    const validateInvite = firebase.functions().httpsCallable('validateInvite')
    await validateInvite({ inviteId })
    setLoading(false)

    const { entity, entityId } = invitation
    if (entity === 'talk') {
      push('speaker-talk-page', { talkId: entityId })
    } else if (entity === 'organization') {
      push('organizer-organization-page', { organizationId: entityId })
    }
  }, [inviteId, invitation, push])

  return { invitation, loading, validate }
}
