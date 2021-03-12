import React, { useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import Badge from 'components/badge'
import LoadingIndicator from 'components/loader'
import { useEvent } from 'data/event'
import { useTalk } from 'data/talk'
import { TalkAbstract, TalkSpeakers } from 'features/talk'
import Notification from 'features/talk/deliberation/notification'

import styles from './submissionPage.module.css'

const SubmissionPage = () => {
  const { eventId, talkId } = useParams()
  const { data: event } = useEvent(eventId)
  const { data: talk } = useTalk(talkId)

  const navigate = useNavigate()
  const handleUpdateSubmission = useCallback(() => {
    navigate(`/speaker/event/${eventId}/submission/${talkId}`)
  }, [navigate, eventId, talkId])

  if (!event || !talk) {
    return <LoadingIndicator />
  }

  const proposal = talk.proposals.find((p) => p.eventId === event.id)
  if (!proposal) {
    return 'no proposal found'
  }

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
              <Notification eventId={eventId} talkId={talkId} />
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
          language={proposal.language}
          level={proposal.level}
        />
        <div className={styles.info}>
          <TalkSpeakers
            talkId={talkId}
            talkTitle={talk.title}
            speakers={talk.speakers}
            ownerId={talk.ownerId}
          />
        </div>
      </div>
    </div>
  )
}

export default SubmissionPage
