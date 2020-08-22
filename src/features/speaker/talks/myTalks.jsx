import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'

import { toDate } from 'helpers/firebase'
import { List, ListItem } from 'components/list'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import RelativeDate from 'components/relativeDate'
import NoTalks from 'screens/components/talk/noTalks'

import TalkInfo from './talkInfo'

const MyTalks = ({ talks }) => {
  const navigate = useNavigate()

  const [status, setStatus] = useState('active')
  const filteredTalks = useMemo(
    () =>
      talks.filter((talk) => {
        if (status === 'all') return true
        if (status === 'archived') return talk.archived === true
        return talk.archived !== true
      }),
    [talks, status],
  )

  const onFilter = (e) => setStatus(e.target.value)

  return (
    <div className="talks-page">
      <Titlebar icon="fa fa-microphone" title="My talks">
        <select onChange={onFilter} value={status}>
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
      <List
        array={filteredTalks}
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

MyTalks.propTypes = {
  talks: PropTypes.arrayOf(PropTypes.object),
}

MyTalks.defaultProps = {
  talks: [],
}

export default MyTalks
