import React, { useCallback } from 'react'
import { Form } from 'react-final-form'

import { LoadingIndicator } from 'components/loader'
import Field from 'components/form/field'
import { input, SubmitButton } from 'components/form'
import { required } from 'components/form/validators'

import './organizationForm.css'
import { useNavigate } from 'react-router-dom'
import { useOrganization, useSaveOrganization } from '../useOrganizations'

const OrganizationForm = () => {
  const { data, isLoading } = useOrganization()

  const [saveOrganization] = useSaveOrganization(data?.id)

  const navigate = useNavigate()
  const handleFormSubmit = useCallback(
    async (formData) => {
      await saveOrganization(formData)
      if (formData.id) {
        navigate(`/organizer/organization/${formData.id}`)
      } else {
        navigate('/organizer/organizations')
      }
    },
    [saveOrganization, navigate],
  )

  if (isLoading) return <LoadingIndicator />

  return (
    <Form onSubmit={handleFormSubmit} initialValues={data}>
      {({ handleSubmit, pristine, submitting }) => (
        <form className="organization-form card">
          <Field name="name" label="Name" type="text" component={input} validate={required} />
          <SubmitButton handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
            {!data ? 'Create organization' : 'Save organization'}
          </SubmitButton>
        </form>
      )}
    </Form>
  )
}

export default OrganizationForm
