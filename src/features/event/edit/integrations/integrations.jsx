import React from 'react'

import Slack from './slack'
import Api from './api'

const IntegrationsForm = () => {
  return (
    <>
      <Slack />
      <Api />
    </>
  )
}

export default IntegrationsForm
