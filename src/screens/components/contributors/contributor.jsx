import React from 'react'
import PropTypes from 'prop-types'

import './contributor.css'

const Contributor = ({ name, image, url }) => (
  <div className="contributor">
    <img className="contributor-avatar" src={image} alt="contributor avatar" />
    <a className="contributor-name" href={url} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  </div>
)

Contributor.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default Contributor
