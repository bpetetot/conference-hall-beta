import React from 'react'
import PropTypes from 'prop-types'

import Inline from 'components/inline'

import './proposalSubtitle.css'

const ProposalSubtitle = ({ formatLabel, categoryLabel }) => (
  <Inline className="proposal-subtitle" classNameItem="proposal-subtitle-item">
    {!!formatLabel && formatLabel}
    {!!categoryLabel && categoryLabel}
  </Inline>
)

ProposalSubtitle.propTypes = {
  formatLabel: PropTypes.string,
  categoryLabel: PropTypes.string,
}

ProposalSubtitle.defaultProps = {
  formatLabel: undefined,
  categoryLabel: undefined,
}

export default ProposalSubtitle
