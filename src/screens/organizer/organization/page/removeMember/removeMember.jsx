import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { ConfirmationPopin } from 'components/portals'

const RemoveMemberButton = ({ user, isOwner, removeMember, authUserId }) => {
  const { uid, displayName } = user
  const canRemove = isOwner && authUserId !== uid
  const canLeave = !isOwner && authUserId === uid

  return (
    <ConfirmationPopin
      title={canRemove ? 'Remove a member' : 'Leave organization'}
      content={`Are you sure you want to ${
        canRemove ? `remove ${displayName} from` : 'leave'
      } organization ?`}
      className="remove-member-modal"
      onOk={removeMember}
      withCancel
      renderTrigger={({ show }) => (
        <>
          {canRemove && (
            <Button onClick={show} tertiary>
              <IconLabel icon="fa fa-trash" label="Remove" />
            </Button>
          )}
          {canLeave && (
            <Button onClick={show} tertiary>
              <IconLabel icon="fa fa-sign-out" label="Leave" />
            </Button>
          )}
        </>
      )}
    />
  )
}

RemoveMemberButton.propTypes = {
  user: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
  removeMember: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
}

export default RemoveMemberButton
