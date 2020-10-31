import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FILTERS } from 'models/Talk'
import { toDate } from 'helpers/firebase'
import { LoadingIndicator } from 'components/loader'
import { List, ListItem } from 'components/list'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import RelativeDate from 'components/relativeDate'
import NoTalks from 'features/talk/noTalks'

import TalkInfo from './talkInfo'
import { useFilteredTalks } from '../useTalks'

const MyTalks = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState(FILTERS.ACTIVE)
  const onFilter = (e) => setStatus(e.target.value)

  const { data: talks, isLoading } = useFilteredTalks(status)

  if (isLoading) return <LoadingIndicator />

  return (
    <div className="talks-page">
      <Titlebar icon="fa fa-microphone" title="My talks">
        <select onChange={onFilter} value={status}>
          <option value={FILTERS.ALL}>All talks</option>
          <option value={FILTERS.ARCHIVED}>Archived talks</option>
          <option value={FILTERS.ACTIVE}>Active talks</option>
        </select>
        <Button accent>
          {(btn) => (
            <Link to="talk/create" className={btn}>
              <IconLabel icon="fa fa-calendar-plus-o" label="Create a new talk" />
            </Link>
          )}
        </Button>
      </Titlebar>
      <List
        array={talks}
        noResult={status === 'archived' ? 'No archived talk' : <NoTalks />}
        renderRow={({ id, title, submissions, archived, updateTimestamp }) => (
          <ListItem
            key={id}
            title={title}
            subtitle={<RelativeDate date={toDate(updateTimestamp)} />}
            info={<TalkInfo id={id} submissions={submissions} archived={archived} />}
            onSelect={() => navigate(`/speaker/talk/${id}`)}
          />
        )}
      />
    </div>
  )
}

export default MyTalks
