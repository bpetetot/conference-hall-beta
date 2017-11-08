import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from '../../../../components/iconLabel'
import Avatar from '../../../../components/avatar'
import Dropdown from '../../../../components/dropdown'

const AvatarDropdown = ({ fullname, image, signout }) => {
  const avatar = <Avatar image={image} fullname={fullname} />
  return (
    <Dropdown action={avatar}>
      <div>{fullname}</div>
      <a href="/" onClick={signout}>
        <IconLabel icon="fa fa-sign-out" label="Sign out" />
      </a>
    </Dropdown>
  )
}

AvatarDropdown.propTypes = {
  fullname: PropTypes.string,
  image: PropTypes.string,
  signout: PropTypes.func.isRequired,
}

AvatarDropdown.defaultProps = {
  fullname: undefined,
  image: undefined,
}

export default AvatarDropdown
