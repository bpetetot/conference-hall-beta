import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateUser } from '../../api/user'
import { Button } from '../../components/Button'
import FormCard from '../../components/forms/FormCard'
import Input from '../../components/forms/Input'
import { useAuth } from '../../lib/auth'

type FormValues = {
  company?: string
  address?: string
  twitter?: string
  github?: string
}

const AdditionalInfoForm = ({ id }: { id: string }) => {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const { mutateAsync } = useUpdateUser()
  const { register, handleSubmit, formState } = useForm<FormValues>()
  const { isSubmitting, isSubmitSuccessful } = formState

  const onSubmit = handleSubmit((data) => {
    return mutateAsync(data)
      .then(() => setSaved(true))
      .catch(() => setSaved(false))
  })

  return (
    <FormCard
      id={id}
      title="Additional information"
      description="Helps organizers to know more about you."
      isSubmitting={isSubmitting}
      isSubmitSuccess={saved && isSubmitSuccessful}
      isSubmitFail={!saved && isSubmitSuccessful}
      onSubmit={onSubmit}
    >
      <FormCard.Content>
        <Input {...register('company')} label="Company" defaultValue={user?.company} optional />
        <Input
          {...register('address')}
          label="Location (city, country)"
          defaultValue={user?.address}
          optional
        />
        <Input
          {...register('twitter')}
          label="Twitter username"
          defaultValue={user?.twitter}
          optional
        />
        <Input
          {...register('github')}
          label="GitHub username"
          defaultValue={user?.github}
          optional
        />
      </FormCard.Content>
      <FormCard.Actions>
        <Button type="submit" primary>
          Save
        </Button>
      </FormCard.Actions>
    </FormCard>
  )
}

export default AdditionalInfoForm
