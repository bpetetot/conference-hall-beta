import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'
import NoTalks from 'features/talk/components/noTalks'
import TalkStatus from 'features/talk/components/status'

import { useFilteredTalks } from 'features/talk/useTalks'
import { LoadingIndicator } from 'components/loader'
import { useCurrentEvent } from 'features/event/currentEventContext'

const TalksSelection = ({ onSelect }) => {
  const { data: event } = useCurrentEvent()
  const { data: talks, isLoading } = useFilteredTalks('active')

  if (isLoading) return <LoadingIndicator />

  return (
    <List
      array={talks}
      noResult={<NoTalks />}
      renderRow={(talk) => (
        <ListItem
          key={talk.id}
          title={talk.title}
          subtitle={<RelativeDate date={talk.updateTimestamp} />}
          info={<TalkStatus talkId={talk.id} eventId={event.id} displayCfpStatus={false} />}
          onSelect={() => onSelect(talk.id)}
        />
      )}
    />
  )
}

TalksSelection.propTypes = {
  onSelect: PropTypes.func.isRequired,
}

export default TalksSelection
