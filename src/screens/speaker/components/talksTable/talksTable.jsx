import React from 'react'
import PropTypes from 'prop-types'

import NoTalks from '../noTalks'
import TalkCard from '../talkCard'

import './talksTable.css'

const TalksTable = ({ talks, onSelectTalk, renderTalkInfo }) => (
  <div className="talks-table card">
    {talks.length === 0 && <NoTalks />}
    {talks.map(id => (
      <TalkCard key={id} id={id} onSelect={onSelectTalk} renderInfo={renderTalkInfo} />
    ))}
  </div>
)

TalksTable.propTypes = {
  onSelectTalk: PropTypes.func.isRequired,
  talks: PropTypes.arrayOf(PropTypes.string),
  renderTalkInfo: PropTypes.func,
}

TalksTable.defaultProps = {
  talks: [],
  renderTalkInfo: undefined,
}

export default TalksTable
