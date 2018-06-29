import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import './apiCard.css'

const ApiCard = ({ name, description, endpoint }) => (
  <div className="api-card card">
    <div>
      <code className="api-name">{name}</code>
      <div className="api-description">{description}</div>
    </div>
    <div>
      <Button secondary href={endpoint} target="_NEW">
        Try out
      </Button>
    </div>
  </div>
)

ApiCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
}

export default ApiCard
