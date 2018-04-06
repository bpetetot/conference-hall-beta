import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Avatar from 'components/avatar'

import './avatarLabel.css'

const AvatarLabel = ({
  displayName, photoURL, suffix, className,
}) => (
  <div className={cn('avatar-label', className)}>
    <Avatar displayName={displayName} photoURL={photoURL} />
    <span className="avatar-label-fullname">
      {displayName}
      {suffix && <span>&nbsp;{suffix}</span>}
    </span>
  </div>
)

AvatarLabel.propTypes = {
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  suffix: PropTypes.string,
  className: PropTypes.string,
}

AvatarLabel.defaultProps = {
  displayName: undefined,
  photoURL: undefined,
  suffix: undefined,
  className: undefined,
}

export default AvatarLabel
