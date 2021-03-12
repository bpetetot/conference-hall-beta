import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'
import NoTalks from 'features/talk/noTalks'

import { useTalks } from 'data/talk'
import Badge from 'components/badge'
import { useNavigate } from 'react-router'

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
  const { data: talks } = useTalks()
  const availableTalks = talks.filter((talk) => !talk.archived)

  const navigate = useNavigate()
  const handleSelect = (talkId) => {
    navigate(`/speaker/event/${eventId}/submission/${talkId}`)
  }

  return (
    <List
      array={availableTalks}
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
  eventId: PropTypes.string.isRequired,
}

export default TalksSelection
