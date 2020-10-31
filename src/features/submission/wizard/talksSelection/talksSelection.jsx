import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'
import NoTalks from 'features/talk/noTalks'
import Status from 'features/talk/status'

import { toDate } from 'helpers/firebase'
import { useFilteredTalks } from 'features/talk/useTalks'
import { LoadingIndicator } from 'components/loader'

const TalksSelection = ({ eventId, onSelect }) => {
  const { data: talks, isLoading } = useFilteredTalks('active')

  if (isLoading) return <LoadingIndicator />

  return (
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
}

TalksSelection.propTypes = {
  eventId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default TalksSelection
