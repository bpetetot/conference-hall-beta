import { useCallback } from 'react'
import firebase from 'firebase/compat/app'

export default (organizationId, onLeaveMember) => {
  const leave = useCallback(async () => {
    const leaveOrganization = firebase.functions().httpsCallable('leaveOrganization')
    leaveOrganization({ organizationId })
    onLeaveMember()
  }, [organizationId, onLeaveMember])

  return { leave }
}
