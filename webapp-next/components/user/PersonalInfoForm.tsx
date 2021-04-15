import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateUser } from '../../api/user'
import { useAuth } from '../../lib/auth'
import { Button } from '../atoms/Button'
import FormCard from '../atoms/forms/FormCard'
import Input from '../atoms/forms/Input'
import { email, url } from '../atoms/forms/validators'

type FormValues = {
  name: string
  email: string
  photoURL?: string
}

const PersonalInfoForm = () => {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const { mutateAsync } = useUpdateUser()
  const { register, handleSubmit, formState } = useForm<FormValues>()
  const { errors, isSubmitting, isSubmitSuccessful } = formState

  const onSubmit = handleSubmit((data) => {
    return mutateAsync(data)
      .then(() => setSaved(true))
      .catch(() => setSaved(false))
  })

  return (
    <FormCard
      id="personal"
      title="Personal information"
      description="Use a permanent address where you can receive mail."
      isSubmitting={isSubmitting}
      isSubmitSuccess={saved && isSubmitSuccessful}
      isSubmitFail={!saved && isSubmitSuccessful}
      onSubmit={onSubmit}
    >
      <FormCard.Content>
        <Input
          {...register('name', { required: 'A full name is required' })}
          label="Full name"
          autoComplete="name"
          defaultValue={user?.name}
          error={errors.name?.message}
        />
        <Input
          {...register('email', { required: 'An email address is required', validate: email })}
          label="Email address"
          autoComplete="email"
          defaultValue={user?.email}
          error={errors.email?.message}
        />
        <Input
          {...register('photoURL', { validate: url })}
          label="Photo URL"
          defaultValue={user?.photoURL}
          error={errors.photoURL?.message}
          optional
        />
      </FormCard.Content>
      <FormCard.Actions>
        <Button onClick={console.log} secondary>
          Reset defaults
        </Button>
        <Button type="submit" primary>
          Save
        </Button>
      </FormCard.Actions>
    </FormCard>
  )
}

export default PersonalInfoForm
