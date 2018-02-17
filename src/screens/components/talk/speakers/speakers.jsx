import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'
import Speaker from '../../speaker'
import './speaker.css'

const TalkSpeakers = ({ speakers, level, className }) => (
  <div className={cn('talk-speakers card', className)}>
    <h3>Speakers & Details</h3>
    {Object.keys(speakers).map(key => <Speaker key={key} id={key} className="talk-info-speaker" />)}
    <Badge>Level {level}</Badge>
  </div>
)

TalkSpeakers.propTypes = {
  speakers: PropTypes.objectOf(PropTypes.bool),
  level: PropTypes.string,
  className: PropTypes.string,
}

TalkSpeakers.defaultProps = {
  level: 'not defined',
  speakers: {},
  className: undefined,
}

export default TalkSpeakers
