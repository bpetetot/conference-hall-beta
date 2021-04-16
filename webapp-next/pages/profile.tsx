import { UserCircleIcon } from '@heroicons/react/outline'
import { AcademicCapIcon } from '@heroicons/react/outline'
import { AnnotationIcon } from '@heroicons/react/outline'

import NavList from '../components/NavList'
import Page from '../features/layout/Page'
import ProfileOverview from '../features/profile/Overview'
import PersonalInfoForm from '../features/profile/PersonalInfoForm'

const ProfilePage = () => {
  return (
    <Page authenticated>
      <ProfileOverview />
      <div className="mt-4 lg:grid lg:grid-cols-12 lg:gap-x-5">
        <NavList className="lg:col-span-3">
          <NavList.Link href="#personal" icon={UserCircleIcon} defaultSelected>
            Personal information
          </NavList.Link>
          <NavList.Link href="#speaker" icon={AcademicCapIcon}>
            Speaker details
          </NavList.Link>
          <NavList.Link href="#additional" icon={AnnotationIcon}>
            Additional information
          </NavList.Link>
        </NavList>

        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <PersonalInfoForm />
        </div>
      </div>
    </Page>
  )
}

export default ProfilePage
