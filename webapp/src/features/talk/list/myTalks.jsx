import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { List, ListItem } from 'components/list'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import LoadingIndicator from 'components/loader'
import RelativeDate from 'components/relativeDate'
import NoTalks from 'features/talk/noTalks'
import { useTalks } from '../../../data/talk'

import TalkInfo from './talkInfo'

const MyTalks = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState()
  const { data: talks, isLoading, isSuccess, isError, error } = useTalks(status)

  return (
    <div className="talks-page">
      <Titlebar icon="fa fa-microphone" title="My talks">
        <select
          onChange={(e) => setStatus(e.target.value)}
          defaultValue="active"
          aria-label="Talks filter"
        >
          <option value="all">All talks</option>
          <option value="archived">Archived talks</option>
          <option value="active">Active talks</option>
        </select>
        <Button accent>
          {(btn) => (
            <Link to="talk/create" className={btn}>
              <IconLabel icon="fa fa-calendar-plus-o" label="Create a new talk" />
            </Link>
          )}
        </Button>
      </Titlebar>
      {isLoading && <LoadingIndicator />}
      {isError && <div>An unexpected error has occurred: {error.message}</div>}
      {isSuccess && (
        <List
          array={talks}
          noResult={status === 'archived' ? 'No archived talk' : <NoTalks />}
          renderRow={({ id, title, proposals, archived, updatedAt }) => (
            <ListItem
              key={id}
              title={title}
              subtitle={<RelativeDate date={updatedAt} />}
              info={<TalkInfo id={id} proposals={proposals} archived={archived} />}
              onSelect={() => navigate(`/speaker/talk/${id}`)}
            />
          )}
        />
      )}
    </div>
  )
}

export default MyTalks
