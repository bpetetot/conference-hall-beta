import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { withModal } from 'components/modal'
import IconLabel from 'components/iconLabel'
import DeleteTalkModal from './deleteTalkModal.container'

const DELETE_TALK_MODAL = 'delete-talk-modal'

const DeleteTalk = ({ talkId, openModal, closeModal }) => (
  <Fragment>
    <a onClick={openModal} role="button" className="btn btn-default">
      <IconLabel icon="fa fa-trash" label="Delete" />
    </a>
    <DeleteTalkModal talkId={talkId} modalId={DELETE_TALK_MODAL} closeModal={closeModal} />
  </Fragment>
)

DeleteTalk.propTypes = {
  talkId: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default withModal(DELETE_TALK_MODAL)(DeleteTalk)
