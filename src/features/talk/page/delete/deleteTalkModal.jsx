import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import upperCase from 'lodash/upperCase'
import { useNavigate } from 'react-router-dom'

import { Modal } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import InputButton from 'components/form/inputButton'
import { useDeleteTalk } from '../../../../data/talk'

import './deleteTalkModal.css'

function DeleteTalkModal({ talkId, talkTitle }) {
  const [disabled, setDisabled] = useState(true)
  const navigate = useNavigate()
  const { mutate: deleteTalk } = useDeleteTalk()

  const handleChange = useCallback(
    (e) => {
      return setDisabled(upperCase(talkTitle) !== upperCase(e.target.value))
    },
    [talkTitle],
  )

  const handleDelete = useCallback(
    () => async () => {
      await deleteTalk(talkId)
      navigate('/speaker')
    },
    [talkId, deleteTalk, navigate],
  )

  return (
    <Modal
      className="delete-talk-modal"
      renderTrigger={({ show }) => (
        <Button onClick={show} secondary>
          <IconLabel icon="fa fa-trash" label="Delete" />
        </Button>
      )}
    >
      {({ hide }) => (
        <>
          <h1>Danger!</h1>
          <p>Be careful, you are going to delete your talk. It&apos;s a definitive action!</p>
          <InputButton
            type="text"
            placeholder="Type the talk name to delete"
            aria-label="Type the talk name to delete"
            btnLabel="Delete!"
            onClick={handleDelete(hide)}
            onChange={handleChange}
            disabled={disabled}
            autoFocus
          />
        </>
      )}
    </Modal>
  )
}

DeleteTalkModal.propTypes = {
  talkId: PropTypes.number.isRequired,
  talkTitle: PropTypes.string.isRequired,
}

export default DeleteTalkModal
