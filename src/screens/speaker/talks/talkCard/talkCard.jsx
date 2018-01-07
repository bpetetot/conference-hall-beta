import React from 'react'
import PropTypes from 'prop-types'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import IconLabel from 'components/iconLabel'

import './talkCard.css'

const TalkCard = ({ title, createTimestamp, goToTalk }) => {
  const relativeDate = distanceInWordsToNow(createTimestamp, { addSuffix: true })
  return (
    <div className="talk-card" onClick={goToTalk} role="button">
      <span className="talk-card-title">{title}</span>
      <small>
        <IconLabel icon="fa fa-clock-o" label={relativeDate} />
      </small>
    </div>
  )
}

TalkCard.propTypes = {
  title: PropTypes.string.isRequired,
  createTimestamp: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  goToTalk: PropTypes.func.isRequired,
}

export default TalkCard
