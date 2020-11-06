import { node } from 'prop-types'
import { useAuth } from 'features/auth'
import { useCurrentEvent } from 'features/event/currentEventContext'
import { useOrganization } from './useOrganizations'

// TODO give eventId instead of useCurrentEvent (useParams not enough for sidebars)
const HasRole = ({ of, forOrganizationId, children, otherwise }) => {
  const { user } = useAuth()
  const { data: event, isLoading: isLoadingEvent } = useCurrentEvent()
  const { data: orga, isLoading } = useOrganization(event?.organization || forOrganizationId)

  const roles = Array.isArray(of) ? of : [of]
  if (
    isLoading ||
    isLoadingEvent ||
    (!roles.includes(orga?.members?.[user.uid]) && event?.owner !== user.uid)
  ) {
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
