import React from 'react'
import PropTypes from 'prop-types'

import TalkCard from '../talkCard'

import './talksTable.css'

const TalksTable = ({ talks, onSelectTalk }) => (
  <div className="talks-table card">
    {talks.length === 0 && (
      <div className="no-talks">
        <h3>No talk yet !</h3>
      </div>
    )}
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
