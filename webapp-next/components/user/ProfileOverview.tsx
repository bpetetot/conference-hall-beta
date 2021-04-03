import { useAuth } from '../../lib/auth'
import Avatar from '../atoms/Avatar'
import { Button, ButtonLink } from '../atoms/Button'
import Card from '../atoms/Card'

const ProfileOverview = () => {
  const { user, signout } = useAuth()

  return (
    <Card>
      <h2 className="sr-only" id="profile-overview-title">
        Profile Overview
      </h2>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:space-x-5">
          <Avatar src={user?.photoURL} name={user?.name} size="xl" className="mx-auto" />
          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
            <p className="text-sm font-medium text-gray-600">Welcome back,</p>
            <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user?.name}</p>
            <p className="text-sm font-medium text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-center sm:mt-0 space-x-4">
          <ButtonLink href="/" secondary>
            Your profile
          </ButtonLink>
          <Button onClick={signout} primary>
            Signout
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ProfileOverview
