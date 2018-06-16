import React from 'react'
import PropTypes from 'prop-types'

import './apiCard.css'

const ApiCard = ({ name, description, endpoint }) => (
  <div className="api-card card">
    <div>
      <code className="api-name">{name}</code>
      <div className="api-description">{description}</div>
    </div>
    <div>
      <a href={endpoint} target="_NEW" className="btn">
        Try out
      </a>
    </div>
  </div>
)

ApiCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
}

export default ApiCard
