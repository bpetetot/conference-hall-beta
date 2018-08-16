import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'

const SurveyInfo = ({ responses, className }) => {
  const accomodationCount = responses
    .filter(r => r.response && r.response.accomodation === 'yes').length
  const planeCount = responses
    .filter(r => r.response && r.response.transports && r.response.transports.plane).length
  const taxiCount = responses
    .filter(r => r.response && r.response.transports && r.response.transports.taxi).length
  const trainCount = responses
    .filter(r => r.response && r.response.transports && r.response.transports.train).length

  if (accomodationCount === 0 && planeCount === 0 && taxiCount === 0 && trainCount === 0) {
    return null
  }

  return (
    <div className={className}>
      {accomodationCount > 0 && <IconLabel icon="fa fa-bed" label={accomodationCount} right />}
      {planeCount > 0 && <IconLabel icon="fa fa-plane" label={planeCount} right />}
      {taxiCount > 0 && <IconLabel icon="fa fa-taxi" label={taxiCount} right />}
      {trainCount > 0 && <IconLabel icon="fa fa-train" label={trainCount} right />}
    </div>
  )
}

SurveyInfo.propTypes = {
  responses: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string,
}

SurveyInfo.defaultProps = {
  responses: {},
  className: undefined,
}

export default SurveyInfo
