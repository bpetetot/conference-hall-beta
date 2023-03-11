import React from 'react'
import PropTypes from 'prop-types'

import './title.css'

function TalkTitle({ name, className }) {
  return (
    <h1 className={className}>
      <span className="talk-title">
        <i className="fa fa-microphone" /> {name}
      </span>
    </h1>
  )
}

TalkTitle.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
}

TalkTitle.defaultProps = {
  className: undefined,
}

export default TalkTitle
