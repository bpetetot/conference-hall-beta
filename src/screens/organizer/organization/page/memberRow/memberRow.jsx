import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { ListItem } from 'components/list'
import { ConfirmationPopin } from 'components/portals'
import Avatar from 'components/avatar/avatar'

import './memberRow.css'

const MemberRow = ({ uid, displayName, photoURL, role, isOwner, removeMember, authUserId }) => {
  if (!displayName) return null

  const canRemove = isOwner && authUserId !== uid
  const canLeave = authUserId === uid

  return (
    <>
      <ListItem
        key={uid}
        title={
          <>
            <Avatar name={displayName} src={photoURL} withLabel />
            {role}
          </>
        }
        renderActions={() => (
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
        )}
      />
    </>
  )
}

MemberRow.propTypes = {
  uid: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  role: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  removeMember: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
}

MemberRow.defaultProps = {
  displayName: undefined,
  photoURL: undefined,
}

export default MemberRow
