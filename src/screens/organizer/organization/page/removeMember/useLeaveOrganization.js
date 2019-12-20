import { useCallback } from 'react'
import firebase from 'firebase/app'

export default (organizationId, onLeaveMember) => {
  const leave = useCallback(async () => {
    const leaveOrganization = firebase.functions().httpsCallable('leaveOrganization')
    await leaveOrganization({ organizationId })
    onLeaveMember()
  }, [organizationId, onLeaveMember])

  return { leave }
}
