import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import Titlebar from 'components/titlebar'
import SubmitTalkLink from 'features/talk/submitTalksLink'
import TalkStatus from 'features/talk/status'
import { List, ListItem } from 'components/list'

function Submissions({ eventId, eventName, talks }) {
  const navigate = useNavigate()

  return (
    <div>
      <Titlebar icon="fa fa-inbox" title={`My submissions to "${eventName}"`}>
        <SubmitTalkLink eventId={eventId} />
      </Titlebar>
      <div>
        <List
          array={talks}
          noResult={<div>No submissions</div>}
          renderRow={({ id, title }) => (
            <ListItem
              key={id}
              title={title}
              info={<TalkStatus talkId={id} eventId={eventId} displayCfpStatus={false} />}
              onSelect={() => navigate(`/speaker/event/${eventId}/submissions/${id}`)}
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
  talks: PropTypes.array,
}

Submissions.defaultProps = {
  talks: [],
}

export default Submissions
