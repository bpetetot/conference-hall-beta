import React from 'react'
import PropTypes from 'prop-types'

import AddUserModal from 'features/invite/addUserModal'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { useNotification } from 'app/layout/notification/context'
import { useAddMember } from '../../../../data/organization'

const AddMember = ({ organizationId, organizationName }) => {
  const { mutate: addMember } = useAddMember(organizationId)
  const { sendError } = useNotification()

  const onSelectMember = (memberId) => {
    addMember(memberId, {
      onError: (err) => sendError(`An unexpected error has occurred: ${err.message}`),
    })
  }

  return (
    <AddUserModal
      onSelectUser={onSelectMember}
      resultsMessage="Select an organizer to add to your organization"
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
      renderTrigger={({ show }) => (
        <Button onClick={show} secondary>
          <IconLabel icon="fa fa-user" label="Add a member" />
        </Button>
      )}
      inviteEntity="organization"
      inviteEntityId={organizationId}
      inviteEntityTitle={organizationName}
    />
  )
}

AddMember.propTypes = {
  organizationId: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
}

export default AddMember
