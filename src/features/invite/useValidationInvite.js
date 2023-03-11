import { useState, useEffect, useCallback } from 'react'
import firebase from 'firebase/compat/app'

import inviteReq from '../../firebase/invites'

// TODO Add unit tests
export default (inviteId, navigate) => {
  const [invitation, setInvitation] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    inviteReq.read(inviteId).then((ref) => setInvitation(ref.data()))
  }, [inviteId])

  const validate = useCallback(async () => {
    setLoading(true)
    const validateInvite = firebase.functions().httpsCallable('validateInvite')
    await validateInvite({ inviteId })
    setLoading(false)

    const { entity, entityId } = invitation
    if (entity === 'talk') {
      navigate(`/speaker/talk/${entityId}`)
    } else if (entity === 'organization') {
      navigate(`/organizer/organization/${entityId}`)
    }
  }, [inviteId, invitation, navigate])

  return { invitation, loading, validate }
}
