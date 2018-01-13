import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import Badge from 'components/badge'

import './proposalSubtitle.css'

const ProposalSubtitle = ({
  submittedDate, formats, categories, state,
}) => (
  <div className="proposal-subtitle">
    {submittedDate && <IconLabel icon="fa fa-clock-o" label={submittedDate} />}
    {formats && <Badge>{formats}</Badge>}
    {categories && <Badge>{categories}</Badge>}
    {state && <Badge>{state}</Badge>}
  </div>
)

ProposalSubtitle.propTypes = {
  submittedDate: PropTypes.string,
  formats: PropTypes.string,
  categories: PropTypes.string,
  state: PropTypes.string,
}

ProposalSubtitle.defaultProps = {
  submittedDate: undefined,
  formats: undefined,
  categories: undefined,
  state: undefined,
}

export default ProposalSubtitle
