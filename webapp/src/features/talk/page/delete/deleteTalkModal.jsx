import React, { useState } from 'react'
import PropTypes from 'prop-types'
import upperCase from 'lodash/upperCase'
import { useNavigate } from 'react-router-dom'

import { Modal } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import InputButton from 'components/form/inputButton'
import { useNotification } from 'app/layout/notification/context'
import { useDeleteTalk } from '../../../../data/talk'

import './deleteTalkModal.css'

function DeleteTalkForm({ talkId, talkTitle, onClose }) {
  const navigate = useNavigate()
  const { sendError } = useNotification()
  const [disabled, setDisabled] = useState(true)
  const { mutate: deleteTalk } = useDeleteTalk()

  const handleChange = (e) => {
    setDisabled(upperCase(talkTitle) !== upperCase(e.target.value))
  }

  const handleDelete = () => {
    deleteTalk(talkId, {
      onSuccess: () => navigate('/speaker'),
      onError: (err) => {
        onClose()
        sendError(`An unexpected error has occurred: ${err.message}`)
      },
    })
  }

  return (
    <>
      <h1>Danger!</h1>
      <p>Be careful, you are going to delete your talk. It&apos;s a definitive action!</p>
      <InputButton
        type="text"
        placeholder="Type the talk name to delete"
        aria-label="Type the talk name to delete"
        btnLabel="Delete!"
        onClick={handleDelete}
        onChange={handleChange}
        disabled={disabled}
        autoFocus
      />
    </>
  )
}

DeleteTalkForm.propTypes = {
  talkId: PropTypes.number.isRequired,
  talkTitle: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

function DeleteTalkModal({ talkId, talkTitle }) {
  return (
    <Modal
      className="delete-talk-modal"
      renderTrigger={({ show }) => (
        <Button onClick={show} secondary>
          <IconLabel icon="fa fa-trash" label="Delete" />
        </Button>
      )}
    >
      {({ hide }) => <DeleteTalkForm talkId={talkId} talkTitle={talkTitle} onClose={hide} />}
    </Modal>
  )
}

DeleteTalkModal.propTypes = {
  talkId: PropTypes.number.isRequired,
  talkTitle: PropTypes.string.isRequired,
}

export default DeleteTalkModal
