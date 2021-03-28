import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

import { Modal } from 'components/portals'
import { useAddSpeaker } from 'data/talk'
import { useNotification } from 'app/layout/notification/context'
import AddUserForm from 'features/invite/addUserForm'
import { useGenerateTalkInvite, useRevokeTalkInvite, useTalkInvite } from 'data/invite'

import './AddSpeakerModal.css'

const createInviteUrl = (inviteUuid) => {
  if (!inviteUuid) return null
  return `${window.location.origin}/invite/${inviteUuid}`
}

const AddSpeakerForm = ({ onClose }) => {
  const { sendError } = useNotification()
  const { talkId } = useParams()

  const { data: inviteUuid, isLoading } = useTalkInvite(talkId)
  const { mutate: generateInvite } = useGenerateTalkInvite(talkId)
  const { mutate: revokeInvite } = useRevokeTalkInvite(talkId)
  const { mutate: addSpeaker } = useAddSpeaker(talkId)

  const onSelectSpeaker = (speakerId) => {
    addSpeaker(speakerId, {
      onError: (err) => sendError(`An unexpected error has occurred: ${err.message}`),
    })
  }
  const onGenerateInvite = () => {
    generateInvite(undefined, {
      onError: (err) => sendError(`An unexpected error has occurred: ${err.message}`),
    })
  }
  const onRevokeInvite = () => {
    revokeInvite(undefined, {
      onError: (err) => sendError(`An unexpected error has occurred: ${err.message}`),
    })
  }

  return (
    <AddUserForm
      title="Add a co-speaker"
      resultsMessage="Add a co-speaker to your talk"
      inviteUrl={createInviteUrl(inviteUuid)}
      isLoadingInvite={isLoading}
      onSelectUser={onSelectSpeaker}
      onGenerateInvite={onGenerateInvite}
      onRevokeInvite={onRevokeInvite}
      onClose={onClose}
      description={
        <>
          <p>
            Search and add a co-speaker to your talk, he/she will be also able to update it and
            submit it to any event.
          </p>
          <p>
            For security and privacy reasons, you can search a speaker only by his/her registered
            email address. Your co-speaker must already have a Conference Hall account.
          </p>
        </>
      }
    />
  )
}

AddSpeakerForm.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default () => {
  const renderTrigger = ({ show }) => (
    <button type="button" onClick={show} className="add-speaker-button">
      <span className="add-speaker-button-icon">
        <i className="fa fa-user fa-lg" />
      </span>
      <span className="add-speaker-button-label">Add a co-speaker</span>
    </button>
  )

  return (
    <Modal renderTrigger={renderTrigger}>{({ hide }) => <AddSpeakerForm onClose={hide} />}</Modal>
  )
}
