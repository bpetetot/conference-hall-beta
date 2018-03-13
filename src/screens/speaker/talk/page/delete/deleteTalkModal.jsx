import React, { Component } from 'react'
import PropTypes from 'prop-types'
import upperCase from 'lodash/upperCase'

import Modal from 'components/modal'
import InputButton from 'components/form/inputButton'
import './deleteTalkModal.css'

class DeleteTalkModal extends Component {
  state = {
    disabled: true,
  }

  handleChange = e =>
    this.setState({ disabled: upperCase(this.props.talkTitle) !== upperCase(e.target.value) })

  render() {
    const { modalId, canDelete, deleteTalk } = this.props
    return (
      <Modal id={modalId} className="delete-talk-modal">
        <h1>Danger!</h1>
        <p>Be careful, you are going to delete your talk. It&apos;s a definitive action!</p>
        {canDelete || (
          <p>
            You&apos;re talk has been already submitted to events, organizer will still have a copy
            of the submitted talk. You should unsubmit it if the call for paper is still open else
            you should contact organizer to remove the talk from the event.
          </p>
        )}
        <InputButton
          type="text"
          placeholder="Type the talk name to delete"
          btnLabel="Delete!"
          onClick={deleteTalk}
          onChange={this.handleChange}
          disabled={this.state.disabled}
        />
      </Modal>
    )
  }
}

DeleteTalkModal.propTypes = {
  talkTitle: PropTypes.string,
  modalId: PropTypes.string.isRequired,
  deleteTalk: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
}

DeleteTalkModal.defaultProps = {
  talkTitle: undefined,
  canDelete: false,
}

export default DeleteTalkModal
