import { useRouter } from 'next/router'

import { useEvent } from '../../api/event'
import { Button } from '../../components/Button'
import Card from '../../components/Card'
import Page from '../../features/layout/Page'

const EventPage = () => {
  const router = useRouter()
  const { data } = useEvent(router.query.event as string)

  return (
    <Page>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="mt-6 lg:mt-0 lg:col-span-3 space-y-4">
          <img src={data?.bannerUrl} alt="Event banner" className="w-auto rounded-lg" />
          <Button primary block>
            Submit a talk
          </Button>
          <Card>
            <h3>Your proposals</h3>
            <p className="mt-1 text-sm text-gray-500">No proposal yet</p>
          </Card>
        </div>
        <div className="lg:col-span-9 space-y-6">
          <Card>
            <h1>{data?.name}</h1>
            <p>Conference</p>
          </Card>
          <Card>
            <h3>Description</h3>
            <p className="mt-2">{data?.description}</p>
            <p className="mt-2">{data?.description}</p>
            <p className="mt-2">{data?.description}</p>
            <p className="mt-2">{data?.description}</p>
          </Card>
        </div>
      </div>
    </Page>
  )
}

export default EventPage
