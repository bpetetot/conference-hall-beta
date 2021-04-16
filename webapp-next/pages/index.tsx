import Page from '../features/layout/Page'
import ProfileOverview from '../features/profile/Overview'

const IndexPage = () => {
  return (
    <Page authenticated>
      <ProfileOverview />
    </Page>
  )
}

export default IndexPage
