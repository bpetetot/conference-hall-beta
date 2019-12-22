import { bool, node } from 'prop-types'

const HasRole = ({ authorized, children, otherwise }) => {
  if (!authorized) return otherwise

  return children
}

HasRole.propTypes = {
  authorized: bool,
  children: node.isRequired,
  otherwise: node,
}

HasRole.defaultProps = {
  authorized: false,
  otherwise: null,
}

export default HasRole
