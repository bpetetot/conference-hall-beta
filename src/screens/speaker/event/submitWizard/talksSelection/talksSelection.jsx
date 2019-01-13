import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'
import NoTalks from 'screens/components/talk/noTalks'
import Status from 'screens/components/talk/status'

import { toDate } from 'helpers/firebase'

const TalksSelection = ({ eventId, talks, onSelect }) => (
  <List
    array={talks}
    noResult={<NoTalks />}
    renderRow={({ id, title, updateTimestamp }) => (
      <ListItem
        key={id}
        title={title}
        subtitle={<RelativeDate date={toDate(updateTimestamp)} />}
        info={<Status eventId={eventId} talkId={id} />}
        onSelect={() => onSelect(id)}
      />
    )}
  />
)

TalksSelection.propTypes = {
  eventId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  talks: PropTypes.arrayOf(PropTypes.object),
}

TalksSelection.defaultProps = {
  talks: [],
}

export default TalksSelection
