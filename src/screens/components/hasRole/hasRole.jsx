import { node } from 'prop-types'
import { useAuth } from 'features/auth'

// TODO Refactor later with a hook
const HasRole = ({ of, orgaMembers, eventOwner, children, otherwise }) => {
  const { user } = useAuth()
  const roles = Array.isArray(of) ? of : [of]

  if (!roles.includes(orgaMembers?.[user.uid]) && eventOwner !== user.uid) {
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
