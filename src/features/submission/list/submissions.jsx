import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import Titlebar from 'components/titlebar'
import SubmitTalkLink from 'features/talk/submitTalksLink'
import TalkStatus from 'features/talk/status'
import { List, ListItem } from 'components/list'
import { LoadingIndicator } from 'components/loader'
import { useEventSubmissions } from '../useSubmissions'

const Submissions = ({ eventId, eventName }) => {
  const navigate = useNavigate()

  const { data: talksSubmitted, isLoading } = useEventSubmissions(eventId)

  if (isLoading) return <LoadingIndicator />

  return (
    <div>
      <Titlebar icon="fa fa-inbox" title={`My submissions to "${eventName}"`}>
        <SubmitTalkLink eventId={eventId} />
      </Titlebar>
      <div>
        <List
          array={talksSubmitted}
          noResult={<div>No submissions</div>}
          renderRow={(talk) => (
            <ListItem
              key={talk.id}
              title={talk.getSubmission(eventId).title}
              info={<TalkStatus talk={talk} eventId={eventId} displayCfpStatus={false} />}
              onSelect={() => navigate(`/speaker/event/${eventId}/submissions/${talk.id}`)}
            />
          )}
        />
      </div>
    </div>
  )
}

Submissions.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
}

export default Submissions
