import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { ConfirmationPopin } from 'components/portals'

const RemoveMemberButton = ({ uid, displayName, isOwner, removeMember, authUserId }) => {
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
  uid: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  isOwner: PropTypes.bool.isRequired,
  removeMember: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
}

RemoveMemberButton.defaultProps = {
  displayName: undefined,
}

export default RemoveMemberButton
