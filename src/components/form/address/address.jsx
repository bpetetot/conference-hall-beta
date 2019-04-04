import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import first from 'lodash/fp/first'
import pick from 'lodash/fp/pick'

import './address.css'

const getAddressComponent = name => flow(
  filter(component => component.types.includes(name)),
  first,
  pick(['short_name', 'long_name']),
)

const AddressInput = (props) => {
  const [address, setAddress] = useState(props.value && props.value.formattedAddress)

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

  return (
    <PlacesAutocomplete {...props} value={address} onChange={setAddress} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className="cc-address-input-wrapper">
          <input {...getInputProps({ autoComplete: 'nope' })} />

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
}

AddressInput.defaultProps = {
  value: undefined,
}

export default AddressInput
