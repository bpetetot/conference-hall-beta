import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'
import sortBy from 'lodash/sortBy'

import Titlebar from 'components/titlebar'
import { List } from 'components/list'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import HasRole from 'screens/components/hasRole'
import { fetchUsersList } from 'firebase/user'

import AddMember from './addMember'
import MemberRow from './memberRow'
import './organizationPage.css'

const OrganizationPage = ({ id: organizationId, name, members, addMember, authUserId }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsersList(Object.keys(members)).then(result => {
      setUsers(sortBy(result, 'displayName'))
    })
  }, [members])

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
            addMember={addMember}
          />
        </HasRole>
      </Titlebar>
      <List
        className="organization-content"
        array={users}
        noResult="No users yet !"
        renderRow={user => (
          <MemberRow
            key={user.uid}
            user={user}
            role={members[user.uid]}
            authUserId={authUserId}
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
  addMember: PropTypes.func.isRequired,
}

OrganizationPage.defaultProps = {
  members: [],
}

export default OrganizationPage
