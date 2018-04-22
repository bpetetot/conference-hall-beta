import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'

import IconLabel from 'components/iconLabel'
import RelativeDate from 'components/relativeDate'
import { ListItem } from 'components/list'
import Modal, { withModal } from 'components/modal'
import AvatarLabel from 'components/avatar/avatarLabel'

import './memberRow.css'

const REMOVE_MEMBER_FROM_ORGANIZATION = 'remove-member-from-organization'

const MemberRow = ({
  uid,
  displayName,
  photoURL,
  updateTimestamp,
  owner,
  openModal,
  closeModal,
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
        subtitle={<RelativeDate date={updateTimestamp} />}
        renderActions={() => (
          <Fragment>
            {canRemove && (
              <a onClick={openModal} role="button" className="btn btn-default">
                <IconLabel icon="fa fa-trash" label="Remove" />
              </a>
            )}
            {canLeave && (
              <a onClick={openModal} role="button" className="btn btn-default">
                <IconLabel icon="fa fa-sign-out" label="Leave" />
              </a>
            )}
          </Fragment>
        )}
      />
      <Modal id={`${REMOVE_MEMBER_FROM_ORGANIZATION}-${uid}`} className="remove-member-modal">
        <h1>{canRemove ? 'Remove member from' : 'Leave'} organization</h1>
        <p>Are you sure you want to {canRemove ? `remove ${displayName} from` : 'leave'} organization ?</p>
        <a
          onClick={() => {
            removeMember()
            closeModal()
          }}
          role="button"
          className="btn btn-default"
        >
          Yes
        </a>
      </Modal>
    </Fragment>
  )
}

MemberRow.propTypes = {
  uid: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  updateTimestamp: PropTypes.instanceOf(Date),
  owner: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
}

MemberRow.defaultProps = {
  displayName: undefined,
  photoURL: undefined,
  updateTimestamp: undefined,
}

export default compose(
  withProps(({ uid }) => ({ modalId: `${REMOVE_MEMBER_FROM_ORGANIZATION}-${uid}` })),
  withModal(),
)(MemberRow)
