import React from 'react'
import PropTypes from 'prop-types'

import IconLink from 'components/iconLink'

function ContactBlock({ contact, className }) {
  if (!contact) return null
  return (
    <IconLink
      icon="fa fa-envelope-o fa-2x"
      className={className}
      label={contact}
      href={`mailto:${contact}`}
    />
  )
}
ContactBlock.propTypes = {
  contact: PropTypes.string,
  className: PropTypes.string,
}

ContactBlock.defaultProps = {
  contact: undefined,
  className: undefined,
}

export default ContactBlock
