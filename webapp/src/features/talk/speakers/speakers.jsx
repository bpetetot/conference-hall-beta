import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Avatar from 'components/avatar'

import AddSpeaker from './addSpeaker'
import RemoveSpeaker from './removeSpeaker'
import './speakers.css'

const TalkSpeakers = ({ talkId, talkTitle, speakers, ownerId, className, edit }) => (
  <div className={cn('talk-speakers card', className)}>
    <h3>Speakers</h3>
    {speakers.map(({ id, name, photoURL }) => (
      <div key={id} className="talk-speaker-row">
        <Avatar src={photoURL} name={name} withLabel />
        {ownerId === id && <small>owner</small>}
        {edit && ownerId !== id && <RemoveSpeaker speakerId={id} talkId={talkId} />}
      </div>
    ))}
    {edit && <AddSpeaker talkId={talkId} talkTitle={talkTitle} />}
  </div>
)

TalkSpeakers.propTypes = {
  talkId: PropTypes.number.isRequired,
  talkTitle: PropTypes.string,
  speakers: PropTypes.array,
  ownerId: PropTypes.number,
  edit: PropTypes.bool,
  className: PropTypes.string,
}

TalkSpeakers.defaultProps = {
  talkTitle: undefined,
  speakers: [],
  ownerId: undefined,
  edit: false,
  className: undefined,
}

export default TalkSpeakers
