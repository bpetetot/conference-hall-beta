import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Speaker from 'screens/components/speaker'

import './proposalInfo.css'

const ProposalInfo = ({ proposal: { speakers = {} } }) => (
  <Fragment>
    {Object.keys(speakers).map(id => (
      <Speaker key={id} id={id} className="proposal-info-speaker" small />
    ))}
  </Fragment>
)

ProposalInfo.propTypes = {
  proposal: PropTypes.objectOf(PropTypes.any),
}

ProposalInfo.defaultProps = {
  proposal: {},
}

export default ProposalInfo
