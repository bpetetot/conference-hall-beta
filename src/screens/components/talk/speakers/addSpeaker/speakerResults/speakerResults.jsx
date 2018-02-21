import React from 'react'
import PropTypes from 'prop-types'

import Speaker from 'screens/components/speaker'
import './speakerResults.css'

const SpeakerResults = ({ speakers, onSelectSpeaker }) => {
  if (speakers.length === 0) {
    return (
      <div className="speakers-no-result">
        <strong>No speaker found !</strong>
        <div>
          You may have a wrong email address or the speaker didn&apos;t signup to Speaker Hall
        </div>
      </div>
    )
  }
  return (
    <div className="speakers-result">
      <h3>Select a speaker for your talk</h3>
      {speakers.map(uid => (
        <div key={uid} onClick={() => onSelectSpeaker(uid)} role="button">
          <Speaker id={uid} />
        </div>
      ))}
    </div>
  )
}

SpeakerResults.propTypes = {
  speakers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectSpeaker: PropTypes.func.isRequired,
}

export default SpeakerResults
