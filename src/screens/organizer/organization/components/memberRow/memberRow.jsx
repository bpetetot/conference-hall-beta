import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import RelativeDate from 'components/relativeDate'
import Button from 'components/button'
import { ListItem } from 'components/list'
import { ConfirmationPopin } from 'components/portals'
import AvatarLabel from 'components/avatar/avatarLabel'

import { toDate } from 'helpers/firebase'

import './memberRow.css'

const MemberRow = ({
  uid,
  displayName,
  photoURL,
  updateTimestamp,
  owner,
  removeMember,
  authUserId,
}) => {
  if (!displayName) return null

  const canRemove = owner === authUserId && owner !== uid
  const canLeave = owner !== authUserId && authUserId === uid

  return (
    <Fragment>
      <ListItem
        key={uid}
        title={(
          <AvatarLabel displayName={displayName} photoURL={photoURL} />
        )}
        subtitle={<RelativeDate date={toDate(updateTimestamp)} />}
        renderActions={() => (
          <ConfirmationPopin
            title={canRemove ? 'Remove a member' : 'Leave organization'}
            content={`Are you sure you want to ${canRemove ? `remove ${displayName} from` : 'leave'} organization ?`}
            className="remove-member-modal"
            onOk={removeMember}
            withCancel
            renderTrigger={({ show }) => (
              <Fragment>
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
              </Fragment>
            )}
          />
        )}
      />
    </Fragment>
  )
}

MemberRow.propTypes = {
  uid: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  updateTimestamp: PropTypes.any,
  owner: PropTypes.string.isRequired,
  removeMember: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
}

MemberRow.defaultProps = {
  displayName: undefined,
  photoURL: undefined,
  updateTimestamp: undefined,
}

export default MemberRow
