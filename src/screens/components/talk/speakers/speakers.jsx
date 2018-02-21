import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import AddSpeaker from './addSpeaker'
import RemoveSpeaker from './removeSpeaker'
import Speaker from '../../speaker'
import './speakers.css'

const TalkSpeakers = ({ speakers, owner, className }) => (
  <div className={cn('talk-speakers card', className)}>
    <h3>Speakers</h3>
    {Object.keys(speakers).map(key => (
      <div key={key} className="talk-speaker-row">
        <Speaker id={key} />
        {owner === key && <small>owner</small>}
        {owner !== key && <RemoveSpeaker uid={key} />}
      </div>
    ))}
    <AddSpeaker />
  </div>
)

TalkSpeakers.propTypes = {
  speakers: PropTypes.objectOf(PropTypes.bool),
  owner: PropTypes.string,
  className: PropTypes.string,
}

TalkSpeakers.defaultProps = {
  speakers: {},
  owner: undefined,
  className: undefined,
}

export default TalkSpeakers
