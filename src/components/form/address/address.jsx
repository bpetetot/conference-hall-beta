import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import first from 'lodash/fp/first'
import pick from 'lodash/fp/pick'
import isEmpty from 'lodash/isEmpty'

import './address.css'

const getAddressComponent = name => flow(
  filter(component => component.types.includes(name)),
  first,
  pick(['short_name', 'long_name']),
)

const AddressInput = ({ placeholder, ...props }) => {
  const [address, setAddress] = useState(props.value.formattedAddress || '')
  const inputRef = useRef()

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
    const country = getAddressComponent('country')(result.address_components)
    const locality = getAddressComponent('locality')(result.address_components)

    props.onChange({
      formattedAddress: selectedAddress,
      locality,
      country,
      latLng,
    })
  }

  const handleFocus = () => {
    inputRef.current.select()
  }

  return (
    <PlacesAutocomplete
      {...props}
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      highlightFirstSuggestion
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className="cc-address-input-wrapper">
          <input
            ref={inputRef}
            {...getInputProps({ autoComplete: 'nope' })}
            onFocus={handleFocus}
            placeholder={placeholder}
          />

          <div className="cc-address-input-suggestions">
            {suggestions.map((suggestion) => {
              const className = cn('cc-address-input-suggestion-item', {
                'cc-address-input-suggestion-item-active': suggestion.active,
              })

              return (
                <div {...getSuggestionItemProps(suggestion, { className })}>
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
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

AddressInput.defaultProps = {
  value: {},
  placeholder: undefined,
}

export default AddressInput
