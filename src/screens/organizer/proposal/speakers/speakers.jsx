import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import keys from 'lodash/keys'

import Speaker from './speaker'

const Speakers = ({ proposal, className }) => (
  <div className={cn(className, 'card')}>
    {keys(proposal.speakers).map((uid) => (
      <Speaker key={uid} uid={uid} />
    ))}
  </div>
)

Speakers.propTypes = {
  proposal: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
}

Speakers.defaultProps = {
  proposal: {},
  className: undefined,
}

export default Speakers
