import { useNotification } from 'app/layout/notification/context'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateOrganization } from '../../../data/organization'

import OrganizationForm from './organizationForm'

const OrganizationCreate = () => {
  const navigate = useNavigate()
  const { sendError } = useNotification()

  const { mutateAsync } = useCreateOrganization()

  const onSubmit = async (orga) => {
    await mutateAsync(orga, {
      onSuccess: (data) => navigate(`/organizer/organization/${data.id}`),
    }).catch((err) => sendError(`An unexpected error has occurred: ${err.message}`))
  }

  return <OrganizationForm onSubmit={onSubmit} />
}

export default OrganizationCreate
