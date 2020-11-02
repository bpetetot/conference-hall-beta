import React from 'react'
import { Link } from 'react-router-dom'

import { LoadingIndicator } from 'components/loader'
import Titlebar from 'components/titlebar'
import { List } from 'components/list'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import HasRole from 'features/organization/hasRole'
import { ROLES } from 'firebase/constants'
import { useAuth } from 'features/auth'
import { useUsers } from 'features/user/useUser'

import AddMember from './addMember'
import MemberRow from './memberRow'
import { useOrganization } from '../useOrganizations'
import './organizationPage.css'

const OrganizationPage = () => {
  const { user } = useAuth()
  const { data, isLoading } = useOrganization()
  const { id, name, members } = data || {}
  const { data: users, isLoading: isLoadingUsers } = useUsers(Object.keys(members || []))

  if (isLoading || isLoadingUsers) return <LoadingIndicator />

  const isOwner = members[user.uid] === ROLES.OWNER

  return (
    <div className="organization-page">
      <Titlebar className="organization-header" icon="fa fa-users" title={name}>
        <HasRole of={ROLES.OWNER} forOrganizationId={id}>
          <Button secondary>
            {(btn) => (
              <Link to={`/organizer/organization/${id}/edit`} className={btn}>
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
            organizationId={id}
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
