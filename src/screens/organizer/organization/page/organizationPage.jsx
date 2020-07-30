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
import { ROLES } from 'firebase/constants'
import { useAuth } from 'features/auth'

import AddMember from './addMember'
import MemberRow from './memberRow'
import './organizationPage.css'

const OrganizationPage = ({ id: organizationId, name, members, addMember }) => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsersList(Object.keys(members)).then((result) => {
      setUsers(sortBy(result, 'displayName'))
    })
  }, [members])

  const isOwner = members[user.uid] === ROLES.OWNER
  return (
    <div className="organization-page">
      <Titlebar className="organization-header" icon="fa fa-users" title={name}>
        <HasRole of={ROLES.OWNER} forOrganizationId={organizationId}>
          <Button secondary>
            {(btn) => (
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
        renderRow={(member) => (
          <MemberRow
            key={member.uid}
            user={member}
            role={members[member.uid]}
            authUserId={user.uid}
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
  addMember: PropTypes.func.isRequired,
}

OrganizationPage.defaultProps = {
  members: [],
}

export default OrganizationPage
