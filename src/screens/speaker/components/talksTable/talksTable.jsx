import React from 'react'
import PropTypes from 'prop-types'

import NoTalks from '../noTalks'
import TalkCard from '../talkCard'

import './talksTable.css'

const TalksTable = ({ talks, onSelectTalk }) => (
  <div className="talks-table card">
    {talks.length === 0 && <NoTalks />}
    {talks.map(id => <TalkCard key={id} id={id} onSelect={onSelectTalk} />)}
  </div>
)

TalksTable.propTypes = {
  onSelectTalk: PropTypes.func.isRequired,
  talks: PropTypes.arrayOf(PropTypes.string),
}

TalksTable.defaultProps = {
  talks: [],
}

export default TalksTable
