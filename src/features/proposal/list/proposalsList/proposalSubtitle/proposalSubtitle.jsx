import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import Inline from 'components/inline'

import './proposalSubtitle.css'

const ProposalSubtitle = ({ proposal }) => (
  <Inline className="proposal-subtitle" classNameItem="proposal-subtitle-item">
    {!isEmpty(proposal.speakers) && `by ${proposal.speakers.map((s) => s.name).join(' & ')}`}
    {!isEmpty(proposal.formats) && proposal.formats[0].name}
    {!isEmpty(proposal.categories) && proposal.categories[0].name}
  </Inline>
)

ProposalSubtitle.propTypes = {
  proposal: PropTypes.object,
}

ProposalSubtitle.defaultProps = {
  proposal: undefined,
}

export default ProposalSubtitle
