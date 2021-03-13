import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingIndicator from 'components/loader'
import { useNotification } from 'app/layout/notification/context'
import { useUpdateOrganization, useOrganization } from '../../../data/organization'

import OrganizationForm from './organizationForm'

const OrganizationEdit = () => {
  const navigate = useNavigate()
  const { sendError } = useNotification()
  const { organizationId } = useParams()
  const { data: organization, isLoading, isError, error } = useOrganization(organizationId)
  const { mutateAsync } = useUpdateOrganization(organizationId)

  const onSubmit = async (orga) => {
    await mutateAsync(orga, {
      onSuccess: () => navigate(`/organizer/organization/${organizationId}`),
    }).catch((err) => sendError(`An unexpected error has occurred: ${err.message}`))
  }

  if (isLoading) return <LoadingIndicator />

  if (isError) return <div>An unexpected error has occurred: {error.message}</div>

  return <OrganizationForm onSubmit={onSubmit} initialValues={{ name: organization.name }} />
}

export default OrganizationEdit
