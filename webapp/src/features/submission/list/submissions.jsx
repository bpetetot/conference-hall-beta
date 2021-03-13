import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import Titlebar from 'components/titlebar'
import SubmitTalkLink from 'features/talk/submitTalksLink'
import { List, ListItem } from 'components/list'
import Badge from 'components/badge'
import LoadingIndicator from 'components/loader'
import { useSpeakerProposals } from 'data/proposal'

const Submissions = ({ event }) => {
  const navigate = useNavigate()
  const { data: proposals, isLoading, isError, error } = useSpeakerProposals(event.id)

  if (!event || isLoading) return <LoadingIndicator />
  if (isError) return <div>An unexpected error has occurred: {error.message}</div>

  return (
    <div>
      <Titlebar icon="fa fa-inbox" title={`My submissions to "${event.name}"`}>
        <SubmitTalkLink eventId={event.id} />
      </Titlebar>
      <div>
        <List
          array={proposals}
          noResult={<div>No submissions</div>}
          renderRow={({ talkId, title, status }) => (
            <ListItem
              key={talkId}
              title={title}
              info={<Badge>{status}</Badge>}
              onSelect={() => navigate(`/speaker/event/${event.id}/submissions/${talkId}`)}
            />
          )}
        />
      </div>
    </div>
  )
}

Submissions.propTypes = {
  event: PropTypes.object.isRequired,
}

export default Submissions
