import Page from '../components/layout/Page'
import ProfileOverview from '../components/user/ProfileOverview'

const IndexPage = () => {
  return (
    <Page authenticated>
      <ProfileOverview />
    </Page>
  )
}

export default IndexPage
