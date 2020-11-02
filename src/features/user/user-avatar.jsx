import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'components/avatar'
import { useUser } from './useUser'

const UserAvatar = ({ userId, ...rest }) => {
  const { data, isLoading } = useUser(userId)
  return (
    <Avatar name={data?.displayName} src={data?.photoURL} loading={isLoading} withLabel {...rest} />
  )
}

UserAvatar.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default UserAvatar
