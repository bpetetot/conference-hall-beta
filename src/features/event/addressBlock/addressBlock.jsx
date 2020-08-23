import React from 'react'
import PropTypes from 'prop-types'
import IconLink from 'components/iconLink'

const AddressBlock = ({ address, className }) => {
  if (!address) return null
  return (
    <IconLink
      icon="fa fa-map-marker fa-2x"
      label={address}
      className={className}
      href={`https://www.google.com/maps/place/${encodeURIComponent(address)}`}
    />
  )
}

AddressBlock.propTypes = {
  address: PropTypes.string,
  className: PropTypes.string,
}

AddressBlock.defaultProps = {
  address: undefined,
  className: undefined,
}

export default AddressBlock
