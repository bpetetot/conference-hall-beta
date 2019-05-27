import React from 'react'
import PropTypes from 'prop-types'

import Navbar from 'screens/components/navbar'

const SearchResults = ({ events }) => (
  <div>
    <Navbar scrolled withSearchInput />
    <h1>{events.length} conferences</h1>
    <span>In <b>France</b></span>
    <hr />
    <h1>{events.length} meetups</h1>
    <span>At <b>Nantes, France</b></span>
    <hr />
  </div>
)

SearchResults.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
}

SearchResults.defaultProps = {
  events: [],
}


export default SearchResults
