import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'
import keys from 'lodash/keys'

import Titlebar from 'components/titlebar'
import { List } from 'components/list'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'

import AddMember from './addMember'
import MemberRow from './memberRow'
import './organizationPage.css'

const OrganizationPage = ({
  id: organizationId,
  name,
  members,
  onSelectUser,
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
      <AddMember organizationId={organizationId} onSelectUser={onSelectUser} />
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
