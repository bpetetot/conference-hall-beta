import React from 'react'
import PropTypes from 'prop-types'

import RelativeDate from 'components/relativeDate'
import Badge from 'components/badge'

import './proposalSubtitle.css'

const ProposalSubtitle = ({
  formats, categories, state, proposal: { updateTimestamp },
}) => (
  <div className="proposal-subtitle">
    <RelativeDate date={updateTimestamp} />
    {formats && <Badge>{formats}</Badge>}
    {categories && <Badge>{categories}</Badge>}
    {state && <Badge>{state}</Badge>}
  </div>
)

ProposalSubtitle.propTypes = {
  proposal: PropTypes.objectOf(PropTypes.any),
  formats: PropTypes.string,
  categories: PropTypes.string,
  state: PropTypes.string,
}

ProposalSubtitle.defaultProps = {
  proposal: {},
  formats: undefined,
  categories: undefined,
  state: undefined,
}

export default ProposalSubtitle
