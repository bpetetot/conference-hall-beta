import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Markdown from 'components/markdown'

const Talk = ({ proposal, className }) => (
  <div className={cn(className, 'card')}>
    <h3>{proposal.title}</h3>
    <p>{proposal.level}</p>
    <p>{proposal.formats}</p>
    <p>{proposal.categories}</p>
    <h3>Abstract</h3>
    <Markdown source={proposal.abstract} />
    <h3>References</h3>
    <Markdown source={proposal.references} />
    <h3>Message to organizers</h3>
    <Markdown source={proposal.message} />
  </div>
)

Talk.propTypes = {
  proposal: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
}

Talk.defaultProps = {
  proposal: {},
  className: undefined,
}

export default Talk
