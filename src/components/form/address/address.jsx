import React from 'react'
import cn from 'classnames'
import PlacesAutocomplete from 'react-places-autocomplete'

import './address.css'

const AddressInput = props => (
  <PlacesAutocomplete {...props}>
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

export default AddressInput
