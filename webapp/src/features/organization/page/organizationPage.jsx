import React from 'react'
import { Link, useParams } from 'react-router-dom'

import Titlebar from 'components/titlebar'
import { List } from 'components/list'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import HasRole from 'features/organization/hasRole'
import { ROLES } from 'features/organization/constants'

import AddMember from './addMember'
import MemberRow from './memberRow'
import './organizationPage.css'
import { useOrganization, useOrganizationMembers } from '../../../data/organization'
import LoadingIndicator from '../../../components/loader'

const OrganizationPage = () => {
  const { organizationId } = useParams()
  const {
    data: organization,
    isLoading: isLoadingOrga,
    isError: isErrorOrga,
    error: errorOrga,
  } = useOrganization(organizationId)

  const {
    data: members,
    isLoading: isLoadingMembers,
    isError: isErrorMembers,
    error: errorMembers,
  } = useOrganizationMembers(organizationId)

  if (isLoadingOrga || isLoadingMembers) return <LoadingIndicator />
  if (isErrorOrga) return <div>An unexpected error has occurred: {errorOrga.message}</div>
  if (isErrorMembers) return <div>An unexpected error has occurred: {errorMembers.message}</div>

  return (
    <div className="organization-page">
      <Titlebar className="organization-header" icon="fa fa-users" title={organization.name}>
        <HasRole of={ROLES.OWNER} forOrganizationId={organizationId}>
          <Button secondary>
            {(btn) => (
              <Link to={`/organizer/organization/${organizationId}/edit`} className={btn}>
                <IconLabel icon="fa fa-pencil" label="Edit" />
              </Link>
            )}
          </Button>
          <AddMember organizationId={organizationId} organizationName={organization.name} />
        </HasRole>
      </Titlebar>
      <List
        className="organization-content"
        array={members}
        noResult="No users yet !"
        renderRow={(member) => (
          <MemberRow key={member.id} organizationId={organizationId} member={member} />
        )}
      />
    </div>
  )
}

export default OrganizationPage
