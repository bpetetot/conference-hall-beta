import { useAuth } from 'features/auth'
import { hasUserOrganizationRoles } from '../../../data/user'

const HasRole = ({ of, forOrganizationId, forEvent, children, otherwise = null }) => {
  const { user } = useAuth()
  const roles = Array.isArray(of) ? of : [of]

  let hasAccess = false
  if (forOrganizationId) {
    hasAccess = hasUserOrganizationRoles(user, forOrganizationId, roles)
  } else if (forEvent && forEvent.organisationId) {
    hasAccess = hasUserOrganizationRoles(user, forEvent.organisationId, roles)
  } else if (forEvent) {
    hasAccess = forEvent.ownerId === user.id
  }
  if (!hasAccess) {
    return otherwise
  }

  return children
}

export default HasRole
