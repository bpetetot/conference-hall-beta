import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Avatar from 'components/avatar'

import AddSpeaker from './addSpeaker'
import RemoveSpeaker from './removeSpeaker'
import './speakers.css'

const TalkSpeakers = ({ talkId, talkTitle, speakers, creatorId, className, edit }) => (
  <div className={cn('talk-speakers card', className)}>
    <h3>Speakers</h3>
    {speakers.map(({ id, name, photoURL }) => (
      <div key={id} className="talk-speaker-row">
        <Avatar src={photoURL} name={name} withLabel />
        {creatorId === id && <small>owner</small>}
        {edit && creatorId !== id && <RemoveSpeaker speakerId={id} talkId={talkId} />}
      </div>
    ))}
    {edit && <AddSpeaker talkId={talkId} talkTitle={talkTitle} />}
  </div>
)

TalkSpeakers.propTypes = {
  talkId: PropTypes.string.isRequired,
  talkTitle: PropTypes.string,
  speakers: PropTypes.array,
  creatorId: PropTypes.number,
  edit: PropTypes.bool,
  className: PropTypes.string,
}

TalkSpeakers.defaultProps = {
  talkTitle: undefined,
  speakers: [],
  creatorId: undefined,
  edit: false,
  className: undefined,
}

export default TalkSpeakers
