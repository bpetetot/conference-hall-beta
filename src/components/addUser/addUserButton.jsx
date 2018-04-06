import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'

import IconLabel from 'components/iconLabel'
import { withModal } from 'components/modal'
import AddUserModal from './addUserModal.container'
import './addUserButton.css'

const AddUserButton = ({
  openModal,
  modalId,
  icon,
  label,
  modalOptions,
  renderButton,
}) => (
  <Fragment>
    {renderButton ? renderButton({ openModal }) : (
      <button className="btn" onClick={openModal}>
        <IconLabel icon={`fa ${icon} fa-lg`} label={label} />
      </button>
    )}
    <AddUserModal modalId={modalId} {...modalOptions} />
  </Fragment>
)

AddUserButton.propTypes = {
  modalId: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  renderButton: PropTypes.func,
  icon: PropTypes.string,
  label: PropTypes.string,
  modalOptions: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.node.isRequired,
    resultsMessage: PropTypes.string.isRequired,
    inviteLink: PropTypes.string.isRequired,
    onSelectUser: PropTypes.func.isRequired,
  }).isRequired,
}

AddUserButton.defaultProps = {
  renderButton: undefined,
  icon: 'fa-user',
  label: 'Add a member',
}

export default compose(
  withProps(ownProps => ({ modalId: ownProps.modalOptions.id })),
  withModal(),
)(AddUserButton)
