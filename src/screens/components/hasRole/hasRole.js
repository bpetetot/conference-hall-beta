import { bool, node } from 'prop-types'

const HasRole = ({ authorized, children }) => {
  if (!authorized) return null

  return children
}

HasRole.propTypes = {
  authorized: bool,
  children: node.isRequired,
}

HasRole.defaultProps = {
  authorized: false,
}

export default HasRole
