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
  id,
  displayName,
  photoURL,
  updateTimestamp,
  owner,
  openModal,
  closeModal,
  removeMember,
  authUserId,
}) => {
  const canRemove = owner === authUserId && owner !== id
  const canLeave = owner !== authUserId && authUserId === id

  return (
    <Fragment>
      <ListItem
        key={id}
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
      <Modal id={`${REMOVE_MEMBER_FROM_ORGANIZATION}-${id}`} className="remove-member-modal">
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
  id: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  updateTimestamp: PropTypes.instanceOf(Date).isRequired,
  owner: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
}

export default compose(
  withProps(ownProps => ({ modalId: `${REMOVE_MEMBER_FROM_ORGANIZATION}-${ownProps.id}` })),
  withModal(),
)(MemberRow)
