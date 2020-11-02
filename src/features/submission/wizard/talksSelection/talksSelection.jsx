import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'
import NoTalks from 'features/talk/components/noTalks'
import TalkStatus from 'features/talk/components/status'

import { useFilteredTalks } from 'features/talk/useTalks'
import { LoadingIndicator } from 'components/loader'

const TalksSelection = ({ eventId, onSelect }) => {
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
          info={<TalkStatus talk={talk} eventId={eventId} displayCfpStatus={false} />}
          onSelect={() => onSelect(talk.id)}
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