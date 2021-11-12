import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import first from 'lodash/fp/first'
import isEmpty from 'lodash/isEmpty'

import './address.css'

const TIMEZONE_API = 'https://maps.googleapis.com/maps/api/timezone/json'
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const getTimezone = async ({ lat, lng }) => {
  const timestamp = Date.now() / 1000
  try {
    const response = await fetch(
      `${TIMEZONE_API}?location=${lat},${lng}&timestamp=${timestamp}&key=${API_KEY}`,
    )
    const result = await response.json()
    if (result && result.status === 'OK') {
      return result.timeZoneId
    }
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
  }
  return null
}

const AddressInput = (props) => {
  const [address, setAddress] = useState(props.value.address || '')

  const handleChange = (inputAddress) => {
    setAddress(inputAddress)
    if (isEmpty(inputAddress)) {
      props.onChange({})
    }
  }

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress)

    const results = await geocodeByAddress(selectedAddress)
    const result = first(results)
    if (!result) return

    const latLng = await getLatLng(result)
    const timezone = await getTimezone(latLng)

    props.onChange({
      address: selectedAddress,
      lat: latLng?.lat,
      lng: latLng?.lng,
      timezone,
    })
  }

  return (
    <PlacesAutocomplete {...props} value={address} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className="cc-address-input-wrapper">
          <input id={props.id} {...getInputProps({ autoComplete: 'off' })} />

          <div className="cc-address-input-suggestions">
            {suggestions.map((suggestion) => {
              const className = cn('cc-address-input-suggestion-item', {
                'cc-address-input-suggestion-item-active': suggestion.active,
              })
              return (
                <div {...getSuggestionItemProps(suggestion, { className })} key={suggestion.index}>
                  <span>{suggestion.description}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

AddressInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
}

AddressInput.defaultProps = {
  value: {},
}

export default AddressInput
