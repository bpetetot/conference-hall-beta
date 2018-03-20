import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'
import NoEvents from 'screens/speaker/components/noEvents'
import Status from 'screens/components/talk/status'

const TalksSelection = ({ talkId, events, onSelect }) => (
  <List
    array={events}
    noResult={<NoEvents />}
    renderRow={({ id, name, updateTimestamp }) => (
      <ListItem
        key={id}
        title={name}
        subtitle={<RelativeDate date={updateTimestamp} />}
        info={<Status eventId={id} talkId={talkId} />}
        onSelect={() => onSelect(id)}
      />
    )}
  />
)

TalksSelection.propTypes = {
  talkId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
}

TalksSelection.defaultProps = {
  events: [],
}

export default TalksSelection
