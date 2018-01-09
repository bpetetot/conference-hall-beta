import React from 'react'
import PropTypes from 'prop-types'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import IconLabel from 'components/iconLabel'

import './talkCard.css'

const TalkCard = ({
  id, title, createTimestamp, onSelect,
}) => {
  const relativeDate = distanceInWordsToNow(createTimestamp, { addSuffix: true })
  return (
    <div className="talk-card" onClick={() => onSelect(id)} role="button">
      <span className="talk-card-title">{title}</span>
      <small>
        <IconLabel icon="fa fa-clock-o" label={relativeDate} />
      </small>
    </div>
  )
}

TalkCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createTimestamp: PropTypes.instanceOf(Date).isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default TalkCard
