import React, { useCallback } from 'react'
import pick from 'lodash/pick'
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
      const result = await saveOrganization(formData)
      navigate(`/organizer/organization/${data?.id || result.id}`)
    },
    [saveOrganization, navigate, data?.id],
  )

  if (isLoading) return <LoadingIndicator />

  const initialValues = pick(data, ['name'])

  return (
    <Form onSubmit={handleFormSubmit} initialValues={initialValues}>
      {({ handleSubmit, pristine, submitting }) => (
        <form className="organization-form card">
          <Field name="name" label="Name" type="text" component={input} validate={required} />
          <SubmitButton handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
            {!data?.id ? 'Create organization' : 'Save organization'}
          </SubmitButton>
        </form>
      )}
    </Form>
  )
}

export default OrganizationForm
