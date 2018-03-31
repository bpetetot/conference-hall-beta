import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Titlebar from 'components/titlebar'
import AvatarLabel from 'components/avatar/avatarLabel'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'
import AddUserButton from 'components/addUser'

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
  name, users, onSelectUser, inviteLink,
}) => (
  <div className="organization-page">
    <Titlebar className="organization-header" icon="fa fa-users" title={name} >
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
      array={users}
      noResult="No users yet !"
      renderRow={({
        id,
        displayName,
        photoURL,
        updateTimestamp,
      }) => (
        <ListItem
          key={id}
          title={(
            <AvatarLabel displayName={displayName} photoURL={photoURL} />
          )}
          subtitle={<RelativeDate date={updateTimestamp} />}
        />
      )}
    />
  </div>
)

OrganizationPage.propTypes = {
  name: PropTypes.string.isRequired,
  inviteLink: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  onSelectUser: PropTypes.func.isRequired,
}

OrganizationPage.defaultProps = {
  users: [],
}

export default OrganizationPage
