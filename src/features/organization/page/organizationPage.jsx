import React, { useState, useEffect } from 'react'
import sortBy from 'lodash/sortBy'
import { Link } from 'react-router-dom'

import { LoadingIndicator } from 'components/loader'
import Titlebar from 'components/titlebar'
import { List } from 'components/list'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import HasRole from 'features/organization/hasRole'
import { fetchUsersList } from 'firebase/user'
import { ROLES } from 'firebase/constants'
import { useAuth } from 'features/auth'

import AddMember from './addMember'
import MemberRow from './memberRow'
import './organizationPage.css'
import { useOrganization } from '../useOrganizations'

const OrganizationPage = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])

  const { data, isLoading } = useOrganization()
  const { id: organizationId, name, members } = data || {}

  useEffect(() => {
    if (isLoading) return
    // TODO refactor with useQueries in react-query 3
    fetchUsersList(Object.keys(members)).then((result) => {
      setUsers(sortBy(result, 'displayName'))
    })
  }, [isLoading, members])

  if (isLoading) return <LoadingIndicator />

  const isOwner = members[user.uid] === ROLES.OWNER

  if (!users.length) return <LoadingIndicator />

  return (
    <div className="organization-page">
      <Titlebar className="organization-header" icon="fa fa-users" title={name}>
        <HasRole of={ROLES.OWNER} forOrganizationId={organizationId}>
          <Button secondary>
            {(btn) => (
              <Link to={`/organizer/organization/${organizationId}/edit`} className={btn}>
                <IconLabel icon="fa fa-pencil" label="Edit" />
              </Link>
            )}
          </Button>
          <AddMember />
        </HasRole>
      </Titlebar>
      <List
        className="organization-content"
        array={users}
        noResult="No users yet !"
        renderRow={(member) => (
          <MemberRow
            key={member.uid}
            organizationId={organizationId}
            member={member}
            role={members[member.uid]}
            isOwner={isOwner}
          />
        )}
      />
    </div>
  )
}

export default OrganizationPage
