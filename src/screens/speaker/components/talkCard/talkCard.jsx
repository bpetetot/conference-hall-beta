import React from 'react'
import PropTypes from 'prop-types'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import IconLabel from 'components/iconLabel'

import './talkCard.css'

const TalkCard = ({ onSelect, renderInfo, ...talk }) => {
  const relativeDate = distanceInWordsToNow(talk.updateTimestamp, { addSuffix: true })
  return (
    <div className="talk-card" onClick={() => onSelect(talk.id)} role="button">
      <div>
        <div className="talk-card-title">{talk.title}</div>
        <div className=" talk-card-subtitle">
          <IconLabel icon="fa fa-clock-o" label={`updated ${relativeDate}`} />
        </div>
      </div>
      <div className="talk-card-info">{renderInfo && renderInfo(talk)}</div>
    </div>
  )
}

TalkCard.propTypes = {
  renderInfo: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
}

TalkCard.defaultProps = {
  renderInfo: undefined,
}

export default TalkCard
