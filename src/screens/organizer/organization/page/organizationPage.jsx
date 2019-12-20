import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import Titlebar from 'components/titlebar'
import { List } from 'components/list'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import HasRole from 'screens/components/hasRole'

import AddMember from './addMember'
import MemberRow from './memberRow'
import './organizationPage.css'

const OrganizationPage = ({
  id: organizationId,
  name,
  members,
  onSelectUser,
  removeMember,
  authUserId,
}) => {
  const isOwner = members[authUserId] === 'owner'
  return (
    <div className="organization-page">
      <Titlebar className="organization-header" icon="fa fa-users" title={name}>
        <HasRole of={['owner']} forOrganizationId={organizationId}>
          <Button secondary>
            {btn => (
              <Link
                code="organizer-organization-edit"
                organizationId={organizationId}
                className={btn}
              >
                <IconLabel icon="fa fa-pencil" label="Edit" />
              </Link>
            )}
          </Button>
          <AddMember
            organizationId={organizationId}
            organizationName={name}
            onSelectUser={onSelectUser}
          />
        </HasRole>
      </Titlebar>
      <List
        className="organization-content"
        array={Object.entries(members)}
        noResult="No users yet !"
        renderRow={([uid, role]) => (
          <MemberRow
            key={uid}
            uid={uid}
            role={role}
            authUserId={authUserId}
            removeMember={() => removeMember(uid)}
            isOwner={isOwner}
          />
        )}
      />
    </div>
  )
}

OrganizationPage.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  members: PropTypes.objectOf(PropTypes.string),
  authUserId: PropTypes.string.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
}

OrganizationPage.defaultProps = {
  members: [],
}

export default OrganizationPage
