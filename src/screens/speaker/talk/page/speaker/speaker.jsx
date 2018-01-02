import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/avatar'

import './speaker.css'

const Speaker = ({ fullname, avatar }) => (
  <div className="speaker-avatar">
    <Avatar fullname={fullname} image={avatar} />
    <span className="speaker-avatar-fullname">{fullname}</span>
  </div>
)

Speaker.propTypes = {
  fullname: PropTypes.string,
  avatar: PropTypes.string,
}

Speaker.defaultProps = {
  fullname: undefined,
  avatar: undefined,
}

export default Speaker
