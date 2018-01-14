import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'

const Header = ({ proposal, className }) => (
  <Titlebar className={className} icon="fa fa-paper-plane" title={proposal.title} />
)

Header.propTypes = {
  proposal: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
}

Header.defaultProps = {
  proposal: {},
  className: undefined,
}

export default Header
