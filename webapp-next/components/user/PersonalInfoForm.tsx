import { useAuth } from '../../lib/auth'
import { Button } from '../atoms/Button'
import FormCard from '../atoms/forms/FormCard'
import Input from '../atoms/forms/Input'

const PersonalInfoForm = () => {
  const { user } = useAuth()

  return (
    <FormCard
      id="personal"
      title="Personal information"
      description="Use a permanent address where you can receive mail."
    >
      <FormCard.Content>
        <Input name="name" label="Full name" autoComplete="name" defaultValue={user?.name ?? ''} />
        <Input
          name="email"
          label="Email address"
          autoComplete="email"
          defaultValue={user?.email ?? ''}
        />
        <Input name="photoURL" label="Photo URL" defaultValue={user?.photoURL ?? ''} />
      </FormCard.Content>
      <FormCard.Actions>
        <Button onClick={console.log} secondary>
          Reset defaults
        </Button>
        <Button onClick={console.log} primary>
          Save
        </Button>
      </FormCard.Actions>
    </FormCard>
  )
}

export default PersonalInfoForm
