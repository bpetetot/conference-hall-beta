import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/avatar'

import './speaker.css'

const Speaker = ({ displayName, photoURL }) => (
  <div className="speaker-avatar">
    <Avatar displayName={displayName} photoURL={photoURL} />
    <span className="speaker-avatar-fullname">{displayName}</span>
  </div>
)

Speaker.propTypes = {
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
}

Speaker.defaultProps = {
  displayName: 'Speaker',
  photoURL: undefined,
}

export default Speaker
