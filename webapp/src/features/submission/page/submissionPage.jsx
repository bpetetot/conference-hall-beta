import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate, useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import Badge from 'components/badge'
import LoadingIndicator from 'components/loader'
import { useTalk } from 'data/talk'
import { TalkAbstract, TalkSpeakers } from 'features/talk'
import Notification from 'features/talk/deliberation/notification'

import styles from './submissionPage.module.css'

const SubmissionPage = ({ event }) => {
  const { talkId } = useParams()
  const { data: talk, isLoading, isError, error } = useTalk(talkId)

  const navigate = useNavigate()
  const handleUpdateSubmission = useCallback(() => {
    navigate(`/speaker/event/${event.id}/submission/${talkId}`)
  }, [navigate, event, talkId])

  if (isLoading) return <LoadingIndicator />
  if (isError) return <div>An unexpected error has occurred: {error.message}</div>

  const proposal = talk.proposals.find((p) => p.eventId === event.id)
  if (!proposal) return <div>No proposal found for the event.</div>

  return (
    <div>
      <Titlebar icon="fa fa-microphone" title={proposal.title}>
        <Link to={`/speaker/talk/${talkId}`}>
          <IconLabel icon="fa fa-history" label="Show current version" />
        </Link>
        {event.isCfpOpened && (
          <Button accent onClick={handleUpdateSubmission}>
            Update submission
          </Button>
        )}
      </Titlebar>
      <div className={styles.submission}>
        <div className={styles.header}>
          {proposal.status === 'ACCEPTED' && (
            <div className={styles.notification}>
              <Notification proposal={proposal} />
            </div>
          )}
          <div className={styles.status}>
            {proposal.status !== 'ACCEPTED' && <Badge>{proposal.status}</Badge>}
            {!isEmpty(proposal.formats) && <Badge outline>{proposal.formats[0].name}</Badge>}
            {!isEmpty(proposal.categories) && <Badge outline>{proposal.categories[0].name}</Badge>}
          </div>
        </div>
        <TalkAbstract
          className={styles.content}
          abstract={proposal.abstract}
          references={proposal.references}
          languages={proposal.languages}
          level={proposal.level}
        />
        <div className={styles.info}>
          <TalkSpeakers
            talkId={talkId}
            talkTitle={talk.title}
            speakers={talk.speakers}
            creatorId={talk.creatorId}
          />
        </div>
      </div>
    </div>
  )
}

SubmissionPage.propTypes = {
  event: PropTypes.object.isRequired,
}

export default SubmissionPage
