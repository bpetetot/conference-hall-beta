import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import Badge from 'components/badge'
import { List, ListItem } from 'components/list'
import LoadingIndicator from 'components/loader'
import RelativeDate from 'components/relativeDate'
import NoTalks from 'features/talk/noTalks'
import { useTalks } from 'data/talk'

function renderBadge(eventId, proposals) {
  const proposal = proposals?.find((p) => p.eventId === parseInt(eventId, 10))
  if (!proposal) return null
  return (
    <Badge outline pill>
      {proposal.status}
    </Badge>
  )
}

const TalksSelection = ({ eventId }) => {
  const { data: talks, isLoading, isError, error } = useTalks()

  const navigate = useNavigate()
  const handleSelect = (talkId) => {
    navigate(`/speaker/event/${eventId}/submission/${talkId}`)
  }

  if (isLoading) {
    return <LoadingIndicator />
  }
  if (isError) {
    return <div>An unexpected error has occurred: {error.message}</div>
  }

  return (
    <List
      array={talks}
      noResult={<NoTalks />}
      renderRow={({ id, title, updatedAt, proposals }) => (
        <ListItem
          key={id}
          title={title}
          subtitle={<RelativeDate date={updatedAt} />}
          info={renderBadge(eventId, proposals)}
          onSelect={() => handleSelect(id)}
        />
      )}
    />
  )
}

TalksSelection.propTypes = {
  eventId: PropTypes.number.isRequired,
}

export default TalksSelection
