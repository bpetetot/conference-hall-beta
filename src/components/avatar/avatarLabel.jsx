import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Avatar from 'components/avatar'

import './avatarLabel.css'

const AvatarLabel = ({
  name, src, suffix, className,
}) => (
  <div className={cn('avatar-label', className)}>
    <Avatar name={name} src={src} />
    <span className="avatar-label-fullname">
      {name}
      {suffix && <span>&nbsp;{suffix}</span>}
    </span>
  </div>
)

AvatarLabel.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  suffix: PropTypes.string,
  className: PropTypes.string,
}

AvatarLabel.defaultProps = {
  name: undefined,
  src: undefined,
  suffix: undefined,
  className: undefined,
}

export default AvatarLabel
