import React from 'react'
import PropTypes from 'prop-types'

import AddUserModal from 'screens/components/addUserModal'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'

const AddMember = ({ organizationId, organizationName, onSelectUser }) => (
  <AddUserModal
    onSelectUser={onSelectUser}
    resultsMessage="Select an organizer to add to your organization"
    description={
      <>
        <p>
          Search and add a member to your organization, he/she will be also able to update it,
          invite other members and create events for your organization.
        </p>
        <p>
          For security and privacy reasons, you can search a member only by his/her registered email
          address. The member must already have a Conference Hall account.
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

AddMember.propTypes = {
  organizationId: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
  onSelectUser: PropTypes.func.isRequired,
}

export default AddMember
