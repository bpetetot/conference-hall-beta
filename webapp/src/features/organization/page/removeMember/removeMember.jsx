import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { ConfirmationPopin } from 'components/portals'
import { useAuth } from '../../../auth'
import { useRemoveMember } from '../../../../data/organization'
import { hasUserOrganizationRoles } from '../../../../data/user'
import { ROLES } from '../../constants'

const RemoveMemberButton = ({ organizationId, member }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { mutate: onRemoveMember } = useRemoveMember(organizationId, member.id)

  const isOwner = hasUserOrganizationRoles(user, organizationId, ROLES.OWNER)
  const canRemove = isOwner && user.id !== member.id
  const canLeave = !isOwner && user.id === member.id

  const onLeave = async () => {
    await onRemoveMember(null, {
      onSuccess: () => navigate('/organizer/organizations'),
    })
  }

  return (
    <ConfirmationPopin
      title={canRemove ? 'Remove a member' : 'Leave organization'}
      content={`Are you sure you want to ${
        canRemove ? `remove ${member.name} from` : 'leave'
      } organization ?`}
      className="remove-member-modal"
      onOk={canRemove ? onRemoveMember : onLeave}
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
}

export default RemoveMemberButton
