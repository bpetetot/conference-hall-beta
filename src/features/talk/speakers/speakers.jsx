import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import UserAvatar from 'features/auth/userAvatar'

import AddSpeaker from './addSpeaker'
import RemoveSpeaker from './removeSpeaker'
import './speakers.css'

const TalkSpeakers = ({ talkId, talkTitle, speakers, owner, className, edit }) => (
  <div className={cn('talk-speakers card', className)}>
    <h3>Speakers</h3>
    {Object.keys(speakers).map((key) => (
      <div key={key} className="talk-speaker-row">
        <UserAvatar id={key} />
        {owner === key && <small>owner</small>}
        {edit && owner !== key && <RemoveSpeaker uid={key} talkId={talkId} />}
      </div>
    ))}
    {edit && <AddSpeaker talkId={talkId} talkTitle={talkTitle} />}
  </div>
)

TalkSpeakers.propTypes = {
  talkId: PropTypes.string.isRequired,
  talkTitle: PropTypes.string.isRequired,
  speakers: PropTypes.objectOf(PropTypes.bool),
  owner: PropTypes.string,
  edit: PropTypes.bool,
  className: PropTypes.string,
}

TalkSpeakers.defaultProps = {
  speakers: {},
  owner: undefined,
  edit: false,
  className: undefined,
}

export default TalkSpeakers
