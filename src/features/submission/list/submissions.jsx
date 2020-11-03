import React from 'react'
import { useNavigate } from 'react-router-dom'

import Titlebar from 'components/titlebar'
import SubmitTalkLink from 'features/talk/components/submitTalksLink'
import TalkStatus from 'features/talk/components/status'
import { useCurrentEvent } from 'features/event/currentEventContext'
import { List, ListItem } from 'components/list'
import { LoadingIndicator } from 'components/loader'
import { useEventSubmissions } from '../useSubmissions'

const Submissions = () => {
  const navigate = useNavigate()
  const { data: event, isLoading: isLoadingEvent } = useCurrentEvent()
  const { data: talksSubmitted, isLoading } = useEventSubmissions(event?.id)

  if (isLoading || isLoadingEvent) return <LoadingIndicator />

  return (
    <div>
      <Titlebar icon="fa fa-inbox" title={`My submissions to "${event.name}"`}>
        {event.isCfpOpened() && <SubmitTalkLink eventId={event.id} />}
      </Titlebar>
      <div>
        <List
          array={talksSubmitted}
          noResult={<div>No submissions</div>}
          renderRow={(talk) => (
            <ListItem
              key={talk.id}
              title={talk.getSubmission(event.id).title}
              info={<TalkStatus talk={talk} eventId={event.id} displayCfpStatus={false} />}
              onSelect={() => navigate(`/speaker/event/${event.id}/submissions/${talk.id}`)}
            />
          )}
        />
      </div>
    </div>
  )
}

export default Submissions
