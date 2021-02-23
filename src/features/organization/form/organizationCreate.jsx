import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateOrganization } from '../../../data/organization'

import OrganizationForm from './organizationForm'

const OrganizationCreate = () => {
  const navigate = useNavigate()

  const { mutateAsync } = useCreateOrganization()

  const onSubmit = async (orga) => {
    await mutateAsync(orga, {
      onSuccess: (data) => {
        navigate(`/organizer/organization/${data.id}`)
      },
    })
  }

  return <OrganizationForm onSubmit={onSubmit} />
}

export default OrganizationCreate
