import React from 'react'
import PropTypes from 'prop-types'

import { useAuth } from 'features/auth'
import { useLeaveOrganization, useUnsetMembers } from 'features/organization/useOrganizations'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { ConfirmationPopin } from 'components/portals'

const RemoveMemberButton = ({ organizationId, member, isOwner }) => {
  const { user } = useAuth()
  const { uid, displayName } = member
  const leaveOrganization = useLeaveOrganization(organizationId)
  const unsetMember = useUnsetMembers(organizationId)
  const onRemoveMember = () => unsetMember(uid)

  const canRemove = isOwner && user.uid !== uid
  const canLeave = !isOwner && user.uid === uid

  return (
    <ConfirmationPopin
      title={canRemove ? 'Remove a member' : 'Leave organization'}
      content={`Are you sure you want to ${
        canRemove ? `remove ${displayName} from` : 'leave'
      } organization ?`}
      className="remove-member-modal"
      onOk={canRemove ? onRemoveMember : leaveOrganization}
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
  organizationId: PropTypes.string.isRequired,
  member: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
}

export default RemoveMemberButton
