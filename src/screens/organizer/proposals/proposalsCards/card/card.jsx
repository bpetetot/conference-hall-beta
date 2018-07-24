import React from 'react'
import PropTypes from 'prop-types'
import first from 'lodash/first'
import keys from 'lodash/keys'

import UserAvatar from 'screens/components/userAvatar'
import TotalRatings from 'screens/organizer/components/totalRatings'
import SurveyInfo from './surveyInfo'
import './card.css'

const ProposalCard = ({
  id,
  eventId,
  title,
  categoryLabel,
  formatLabel,
  rating,
  loves,
  hates,
  speakers,
  onSelect,
}) => {
  const speakerId = first(keys(speakers))
  const nbSpeakers = keys(speakers).length

  return (
    <div className="proposal-card" onClick={() => onSelect(eventId, id)} role="button">
      <div className="proposal-card-header">
        <div className="proposal-card-title">{title}</div>
      </div>
      <div className="proposal-card-speakers">
        <UserAvatar id={speakerId} small />
        {nbSpeakers > 1 && <div>+{nbSpeakers - 1} speaker(s)</div>}
      </div>
      <div className="proposal-card-survey">
        <SurveyInfo eventId={eventId} speakers={speakers} />
      </div>
      <div className="proposal-card-info">
        {formatLabel ? <div>{formatLabel}</div> : <div>-</div>}
        {categoryLabel ? <div>{categoryLabel}</div> : <div>-</div>}
      </div>
      <div className="proposal-card-rating">
        <TotalRatings rating={rating} loves={loves} hates={hates} />
      </div>
    </div>
  )
}

ProposalCard.propTypes = {
  id: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  categoryLabel: PropTypes.string,
  formatLabel: PropTypes.string,
  rating: PropTypes.number,
  loves: PropTypes.number,
  hates: PropTypes.number,
  speakers: PropTypes.objectOf(PropTypes.any),
  onSelect: PropTypes.func.isRequired,
}

ProposalCard.defaultProps = {
  categoryLabel: undefined,
  formatLabel: undefined,
  rating: undefined,
  loves: undefined,
  hates: undefined,
  speakers: {},
}

export default ProposalCard
