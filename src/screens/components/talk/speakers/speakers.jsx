import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import AddSpeakerButton from './addSpeakerButton'
import Speaker from '../../speaker'
import './speaker.css'

const TalkSpeakers = ({ speakers, owner, className }) => (
  <div className={cn('talk-speakers card', className)}>
    <h3>Speakers</h3>
    {Object.keys(speakers).map(key => (
      <div className="talk-speaker-row">
        <Speaker key={key} id={key} />
        {owner === key && <small>owner</small>}
        {owner !== key && (
          <a role="button" onClick="#">
            <i className="fa fa-trash fa-lg" />
          </a>
        )}
      </div>
    ))}
    <AddSpeakerButton />
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
