import React from 'react'
import PropTypes from 'prop-types'

import TalksTable from '../../components/talksTable'
import TalkCardInfo from './talkCardInfo'

const TalksSelection = ({ eventId, ...props }) => (
  <TalksTable
    {...props}
    renderTalkInfo={talk => <TalkCardInfo eventId={eventId} talkId={talk.id} />}
  />
)

TalksSelection.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default TalksSelection
