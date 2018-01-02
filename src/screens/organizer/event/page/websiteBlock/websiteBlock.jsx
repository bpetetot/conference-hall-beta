import React from 'react'
import PropTypes from 'prop-types'

import IconCard from 'components/iconCard'

const WebsiteBlock = ({ website, className }) => {
  if (!website) return null
  return (
    <IconCard icon="fa fa-globe" className={className} href={website}>
      {website}
    </IconCard>
  )
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
