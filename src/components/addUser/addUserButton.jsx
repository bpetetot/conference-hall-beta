import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { withModal } from 'components/modal'
import AddUserModal from './addUserModal.container'
import './addUserButton.css'

const AddUserButton = ({
  openModal,
  modalId,
  icon,
  label,
  modalOptions,
  children,
}) => (
  <Fragment>
    {children ? children({ openModal }) : (
      <a onClick={openModal} role="button" className="add-user-button">
        <span className="add-user-button-icon">
          <i className={`fa ${icon} fa-lg`} />
        </span>
        <span className="add-user-button-label">{label}</span>
      </a>
    )}
    <AddUserModal modalId={modalId} {...modalOptions} />
  </Fragment>
)

AddUserButton.propTypes = {
  modalId: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  children: PropTypes.func,
  icon: PropTypes.string,
  label: PropTypes.string,
  modalOptions: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    inviteLink: PropTypes.string.isRequired,
    onSelectUser: PropTypes.func.isRequired,
  }).isRequired,
}

AddUserButton.defaultProps = {
  children: undefined,
  icon: 'fa-users',
  label: 'Add a user',
}

export default withModal()(AddUserButton)
