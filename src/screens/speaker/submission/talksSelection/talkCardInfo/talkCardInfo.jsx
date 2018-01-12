import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Badge from 'components/badge'

const TalkCardInfo = ({ submitted }) => (
  <Fragment>
    <span>{submitted && <Badge>already submitted</Badge>}</span>
  </Fragment>
)

TalkCardInfo.propTypes = {
  submitted: PropTypes.bool,
}

TalkCardInfo.defaultProps = {
  submitted: false,
}

export default TalkCardInfo
