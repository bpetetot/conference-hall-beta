import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'
import keys from 'lodash/keys'

import Titlebar from 'components/titlebar'
import { List } from 'components/list'
import AddMember from 'screens/components/addUserModal'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import MemberRow from './memberRow'

import './organizationPage.css'

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
      <Button secondary>
        {btn => (
          <Link code="organizer-organization-edit" organizationId={organizationId} className={btn}>
            <IconLabel icon="fa fa-pencil" label="Edit" />
          </Link>
        )}
      </Button>
      <AddMember
        onSelectUser={onSelectUser}
        inviteLink={inviteLink}
        resultsMessage="Select an organizer to add to your organization"
        description={(
          <Fragment>
            <p>
              Search and add a member to your organization, he/she will be also able to update it,
              invite other members and create events for your organization.
              <br />
              The member must already have a member Hall account.
            </p>
            <p>
              For security and privacy reasons, you can search a member only by his/her registered
              email address.
            </p>
          </Fragment>
)}
        renderTrigger={({ show }) => (
          <Button onClick={show} secondary>
            <IconLabel icon="fa fa-user" label="Add a member" />
          </Button>
        )}
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
