import React from 'react'
import PropTypes from 'prop-types'
import IconCard from 'components/iconCard'

const AddressBlock = ({ address, className }) => {
  if (!address) return null
  return (
    <IconCard
      icon="fa fa-map-marker"
      className={className}
      href={`https://www.google.com/maps/place/${encodeURIComponent(address)}`}
    >
      {address}
    </IconCard>
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
