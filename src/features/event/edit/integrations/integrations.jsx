import React from 'react'
import PropTypes from 'prop-types'

import Slack from './slack'
import Api from './api'

const IntegrationsForm = ({ eventId }) => (
  <>
    <Slack eventId={eventId} />
    <Api eventId={eventId} />
  </>
)

IntegrationsForm.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default IntegrationsForm
