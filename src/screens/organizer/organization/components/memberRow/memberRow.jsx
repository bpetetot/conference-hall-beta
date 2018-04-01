import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import RelativeDate from 'components/relativeDate'
import { ListItem } from 'components/list'
import Modal, { withModal } from 'components/modal'
import AvatarLabel from 'components/avatar/avatarLabel'

import './memberRow.css'

const REMOVE_MEMBER_FROM_ORGANIZATION = 'remove-member-from-organization'

const MemberRow = ({
  id, displayName, photoURL, updateTimestamp, owner, openModal, closeModal,
}) => (
  <Fragment>
    <ListItem
      key={id}
      title={(
        <AvatarLabel displayName={displayName} photoURL={photoURL} />
      )}
      subtitle={<RelativeDate date={updateTimestamp} />}
      renderActions={() => owner === id || (
        <a onClick={openModal} role="button" className="btn btn-default">
          <IconLabel icon="fa fa-trash" label="Remove from organization" />
        </a>
      )}
    />
    <Modal id={REMOVE_MEMBER_FROM_ORGANIZATION} className="remove-member-modal">
      <h1>Remove member from organization</h1>
      <p>Are you sure you want to remove {displayName} from organization ?</p>
      <a onClick={() => { closeModal() }} role="button" className="btn btn-default">
        <IconLabel icon="fa fa-trash" label="Remove from organization" />
      </a>
    </Modal>
  </Fragment>
)

MemberRow.propTypes = {
  id: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  updateTimestamp: PropTypes.instanceOf(Date).isRequired,
  owner: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default withModal(REMOVE_MEMBER_FROM_ORGANIZATION)(MemberRow)
