import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingIndicator } from 'components/loader'
import { useUpdateOrganization, useOrganization } from '../../../data/organization'

import OrganizationForm from './organizationForm'

const OrganizationEdit = () => {
  const navigate = useNavigate()
  const { organizationId } = useParams()
  const { data: organization, isLoading } = useOrganization(organizationId)
  const { mutateAsync } = useUpdateOrganization(organizationId)

  const onSubmit = async (orga) => {
    await mutateAsync(orga, {
      onSuccess: () => {
        navigate(`/organizer/organization/${organizationId}`)
      },
    })
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  return <OrganizationForm onSubmit={onSubmit} initialValues={{ name: organization.name }} />
}

export default OrganizationEdit
