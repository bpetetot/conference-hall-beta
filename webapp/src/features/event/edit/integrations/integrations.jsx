import React from 'react'
import PropTypes from 'prop-types'

import Slack from './slack'
import Api from './api'

const IntegrationsForm = ({ event }) => (
  <>
    <Slack event={event} />
    <Api event={event} />
  </>
)

IntegrationsForm.propTypes = {
  event: PropTypes.object.isRequired,
}

export default IntegrationsForm
