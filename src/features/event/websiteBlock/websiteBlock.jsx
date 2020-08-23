import React from 'react'
import PropTypes from 'prop-types'

import IconLink from 'components/iconLink'

const WebsiteBlock = ({ website, className }) => {
  if (!website) return null
  return <IconLink icon="fa fa-globe fa-2x" className={className} label={website} href={website} />
}
WebsiteBlock.propTypes = {
  website: PropTypes.string,
  className: PropTypes.string,
}

WebsiteBlock.defaultProps = {
  website: undefined,
  className: undefined,
}

export default WebsiteBlock
