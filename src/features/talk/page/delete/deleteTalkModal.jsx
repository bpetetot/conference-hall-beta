import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import upperCase from 'lodash/upperCase'

import { Modal } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import InputButton from 'components/form/inputButton'

import './deleteTalkModal.css'
import { useNavigate } from 'react-router-dom'

function DeleteTalkModal({ talkTitle, deleteTalk }) {
  const [disabled, setDisabled] = useState(true)
  const navigate = useNavigate()

  const handleChange = useCallback(
    (e) => {
      return setDisabled(upperCase(talkTitle) !== upperCase(e.target.value))
    },
    [talkTitle],
  )

  const handleDelete = useCallback(
    (hide) => async () => {
      hide()
      await deleteTalk()
      navigate('/speaker')
    },
    [deleteTalk, navigate],
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
            btnLabel="Delete!"
            onClick={handleDelete(hide)}
            onChange={handleChange}
            disabled={disabled}
          />
        </>
      )}
    </Modal>
  )
}

DeleteTalkModal.propTypes = {
  talkTitle: PropTypes.string,
  deleteTalk: PropTypes.func.isRequired,
}

DeleteTalkModal.defaultProps = {
  talkTitle: undefined,
}

export default DeleteTalkModal
