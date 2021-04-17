import Avatar from '../../components/Avatar'
import { ButtonLink } from '../../components/Button'
import Card from '../../components/Card'
import { useAuth } from '../../lib/auth'

const ProfileOverview = ({ withProfileLink = false }) => {
  const { user } = useAuth()

  return (
    <Card>
      <h1 className="sr-only">Profile Overview</h1>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:space-x-5">
          <Avatar src={user?.photoURL} name={user?.name} size="xl" className="mx-auto" />
          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
            <p className="text-sm mt-0 text-gray-600">Welcome back,</p>
            <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user?.name}</p>
            <p className="text-sm font-medium text-gray-600">{user?.email}</p>
          </div>
        </div>
        {withProfileLink && (
          <div className="mt-5 flex justify-center sm:mt-0 space-x-4">
            <ButtonLink href="/profile" secondary>
              Your profile
            </ButtonLink>
          </div>
        )}
      </div>
    </Card>
  )
}

export default ProfileOverview
