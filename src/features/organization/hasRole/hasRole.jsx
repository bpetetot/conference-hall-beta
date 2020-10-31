import { node } from 'prop-types'
import { useAuth } from 'features/auth'
import { useOrganization } from '../useOrganizations'

const HasRole = ({
  of,
  forOrganizationId,
  eventOrganizationId,
  eventOwner,
  children,
  otherwise,
}) => {
  const { user } = useAuth()
  const roles = Array.isArray(of) ? of : [of]

  const { data, isLoading } = useOrganization(eventOrganizationId || forOrganizationId)

  if (isLoading || (!roles.includes(data?.members?.[user.uid]) && eventOwner !== user.uid)) {
    return otherwise
  }

  return children
}

HasRole.propTypes = {
  children: node.isRequired,
  otherwise: node,
}

HasRole.defaultProps = {
  otherwise: null,
  orgaMembers: null,
  eventOwner: null,
}

export default HasRole
