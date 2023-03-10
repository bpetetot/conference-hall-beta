import React from 'react'
import PropTypes from 'prop-types'

import Inline from 'components/inline'

import './proposalSubtitle.css'

function ProposalSubtitle({ formatLabel, categoryLabel, speakerName }) {
  return (
    <Inline className="proposal-subtitle" classNameItem="proposal-subtitle-item">
      {!!speakerName && `by ${speakerName}`}
      {!!formatLabel && formatLabel}
      {!!categoryLabel && categoryLabel}
    </Inline>
  )
}

ProposalSubtitle.propTypes = {
  formatLabel: PropTypes.string,
  categoryLabel: PropTypes.string,
  speakerName: PropTypes.string,
}

ProposalSubtitle.defaultProps = {
  formatLabel: undefined,
  categoryLabel: undefined,
  speakerName: undefined,
}

export default ProposalSubtitle
