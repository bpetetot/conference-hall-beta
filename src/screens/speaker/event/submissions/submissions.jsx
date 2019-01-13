import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import SubmitTalkLink from 'screens/components/submitTalksLink'
import TalkStatus from 'screens/components/talk/status'
import { List, ListItem } from 'components/list'

const Submissions = ({
  eventId, eventName, talks, onSelect,
}) => (
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
            onSelect={() => onSelect(id)}
          />
        )}
      />
    </div>
  </div>
)

Submissions.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  talks: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
}

Submissions.defaultProps = {
  talks: [],
}

export default Submissions
