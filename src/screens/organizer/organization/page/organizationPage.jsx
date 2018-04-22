import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'
import keys from 'lodash/keys'

import Titlebar from 'components/titlebar'
import { List } from 'components/list'
import AddUserButton from 'components/addUser'
import IconLabel from 'components/iconLabel'
import MemberRow from '../components/memberRow'

import './organizationPage.css'

const modalMessage = (
  <Fragment>
    <p>
      Search and add a member to your organization, he/she will be also able to update it,
      invite other members and create events for your organization.<br />
      The member must already have a member Hall account.
    </p>
    <p>
      For security and privacy reasons, you can search a member only by his/her registered email
      address.
    </p>
  </Fragment>
)

const OrganizationPage = ({
  id: organizationId,
  name,
  members,
  onSelectUser,
  inviteLink,
  removeMember,
  owner,
  authUserId,
}) => (
  <div className="organization-page">
    <Titlebar className="organization-header" icon="fa fa-users" title={name}>
      <Link href={`/organizer/organizations/${organizationId}/edit`} className="btn">
        <IconLabel icon="fa fa-pencil" label="Edit" />
      </Link>
      <AddUserButton
        modalOptions={{
          id: 'add-user-to-organization',
          message: modalMessage,
          resultsMessage: 'Select an organizer to add to your organization',
          onSelectUser,
          inviteLink,
        }}
      />
    </Titlebar>
    <List
      className="organization-content"
      array={keys(members)}
      noResult="No users yet !"
      renderRow={uid => (
        <MemberRow
          key={uid}
          uid={uid}
          authUserId={authUserId}
          removeMember={() => removeMember(uid)}
          owner={owner}
        />
      )}
    />
  </div>
)

OrganizationPage.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inviteLink: PropTypes.string.isRequired,
  members: PropTypes.objectOf(PropTypes.bool),
  owner: PropTypes.string.isRequired,
  authUserId: PropTypes.string.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
}

OrganizationPage.defaultProps = {
  members: [],
}

export default OrganizationPage
