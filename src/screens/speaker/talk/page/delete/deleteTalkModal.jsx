import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import upperCase from 'lodash/upperCase'

import { Modal } from 'components/portals'
import IconLabel from 'components/iconLabel'
import InputButton from 'components/form/inputButton'

import './deleteTalkModal.css'

class DeleteTalkModal extends Component {
  state = {
    disabled: true,
  }

  handleChange = e =>
    this.setState({ disabled: upperCase(this.props.talkTitle) !== upperCase(e.target.value) })

  handleDelete = hide => () => {
    this.props.deleteTalk()
    hide()
  }

  render() {
    return (
      <Modal
        className="delete-talk-modal"
        renderTrigger={({ show }) => (
          <a onClick={show} role="button" className="btn btn-default">
            <IconLabel icon="fa fa-trash" label="Delete" />
          </a>
        )}
      >
        {({ hide }) => (
          <Fragment>
            <h1>Danger!</h1>
            <p>Be careful, you are going to delete your talk. It&apos;s a definitive action!</p>
            {this.props.canDelete || (
              <p>
                Your talk has been already submitted to events, organizer will still have a copy of
                the submitted talk. You should unsubmit it if the call for paper is still open else
                you should contact organizer to remove the talk from the event.
              </p>
            )}
            <InputButton
              type="text"
              placeholder="Type the talk name to delete"
              btnLabel="Delete!"
              onClick={this.handleDelete(hide)}
              onChange={this.handleChange}
              disabled={this.state.disabled}
            />
          </Fragment>
        )}
      </Modal>
    )
  }
}

DeleteTalkModal.propTypes = {
  talkTitle: PropTypes.string,
  deleteTalk: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
}

DeleteTalkModal.defaultProps = {
  talkTitle: undefined,
  canDelete: false,
}

export default DeleteTalkModal
