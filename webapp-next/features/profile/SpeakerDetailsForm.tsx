import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateUser } from '../../api/user'
import { Button } from '../../components/Button'
import FormCard from '../../components/forms/FormCard'
import Input from '../../components/forms/Input'
import TextArea from '../../components/forms/TextArea'
import { useAuth } from '../../lib/auth'

type FormValues = {
  language?: string
  bio?: string
  references?: string
}

const SpeakerDetailsForm = ({ id }: { id: string }) => {
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
      title="Speaker details"
      description="Give more information about you, these information will be visible by organizers when you submit a talk."
      isSubmitting={isSubmitting}
      isSubmitSuccess={saved && isSubmitSuccessful}
      isSubmitFail={!saved && isSubmitSuccessful}
      onSubmit={onSubmit}
    >
      <FormCard.Content>
        <TextArea
          {...register('bio')}
          label="Biography"
          description="Brief description for your profile. Markdown is supported."
          defaultValue={user?.bio}
          optional
        />
        <TextArea
          {...register('references')}
          label="Speaker references"
          description="Give some information about your speaker experience: your already-given talks, conferences or meetups as speaker, video links. Markdown is supported."
          defaultValue={user?.references}
          optional
        />
        <Input
          {...register('language')}
          label="Spoken language"
          defaultValue={user?.language}
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

export default SpeakerDetailsForm
