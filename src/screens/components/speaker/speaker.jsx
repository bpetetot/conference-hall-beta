import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Avatar from 'components/avatar'

import './speaker.css'

const Speaker = ({
  displayName, photoURL, suffix, className,
}) => (
  <div className={cn('speaker-avatar', className)}>
    <Avatar displayName={displayName} photoURL={photoURL} />
    <span className="speaker-avatar-fullname">
      {displayName}
      {suffix && <span>&nbsp;{suffix}</span>}
    </span>
  </div>
)

Speaker.propTypes = {
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  suffix: PropTypes.string,
  className: PropTypes.string,
}

Speaker.defaultProps = {
  displayName: undefined,
  photoURL: undefined,
  suffix: undefined,
  className: undefined,
}

export default Speaker
