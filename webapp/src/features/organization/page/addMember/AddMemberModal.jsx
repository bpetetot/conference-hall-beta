import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

import { Modal } from 'components/portals'
import { useAddMember } from 'data/organization'
import { useNotification } from 'app/layout/notification/context'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import AddUserForm from 'features/invite/addUserForm'
import {
  useGenerateOrganizationInvite,
  useOrganizationInvite,
  useRevokeOrganizationInvite,
} from 'data/invite'

const createInviteUrl = (inviteUuid) => {
  if (!inviteUuid) return null
  return `${window.location.origin}/invite/${inviteUuid}`
}

const AddMemberForm = ({ onClose }) => {
  const { sendError } = useNotification()
  const { organizationId } = useParams()

  const { data: inviteUuid, isLoading } = useOrganizationInvite(organizationId)
  const { mutate: generateInvite } = useGenerateOrganizationInvite(organizationId)
  const { mutate: revokeInvite } = useRevokeOrganizationInvite(organizationId)
  const { mutate: addMember } = useAddMember(organizationId)

  const onSelectMember = (memberId) => {
    addMember(memberId, {
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
      title="Add a member"
      resultsMessage="Select an organizer to add to your organization"
      inviteUrl={createInviteUrl(inviteUuid)}
      isLoadingInvite={isLoading}
      onSelectUser={onSelectMember}
      onGenerateInvite={onGenerateInvite}
      onRevokeInvite={onRevokeInvite}
      onClose={onClose}
      description={
        <>
          <p>
            Add or invite a member to your organization. By default, the new member will have{' '}
            <strong>the role of &ldquo;Reviewer&rdquo;.</strong> You can changed it once the user is
            added.
          </p>
          <p>
            For security and privacy reasons, you can search a member only by the registered email
            address. <strong>The member must already have a Conference Hall account.</strong>
          </p>
        </>
      }
    />
  )
}

AddMemberForm.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default () => {
  const renderTrigger = ({ show }) => (
    <Button onClick={show} secondary>
      <IconLabel icon="fa fa-user" label="Add a member" />
    </Button>
  )
  return (
    <Modal renderTrigger={renderTrigger}>{({ hide }) => <AddMemberForm onClose={hide} />}</Modal>
  )
}
