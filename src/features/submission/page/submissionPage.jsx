import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'

import { LoadingIndicator } from 'components/loader'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { FormatBadge, CategoryBadge } from 'features/event/badges'
import TalkSpeakers from 'features/talk/components/speakers'
import TalkAbstract from 'features/talk/components/abstract'
import TalkStatus from 'features/talk/components/status'
import TalkDeliberation from 'features/talk/components/deliberation'
import { useTalk } from 'features/talk/useTalks'
import { SUBMISSION_STATES } from 'models/Talk'

import styles from './submissionPage.module.css'

const SubmissionPage = ({ talkId, eventId, onUpdateSubmission, cfpOpened }) => {
  const navigate = useNavigate()

  const { data: talk, isLoading } = useTalk(talkId)

  const handleUpdateSubmission = useCallback(() => {
    onUpdateSubmission()
    navigate(`/speaker/event/${eventId}/submission`)
  }, [onUpdateSubmission, navigate, eventId])

  if (isLoading) return <LoadingIndicator />

  const {
    id,
    title,
    abstract,
    level,
    owner,
    state,
    references,
    language,
    formats,
    speakers,
    categories,
  } = talk.getSubmission(eventId)

  return (
    <div>
      <Titlebar icon="fa fa-microphone" title={title}>
        <Link to={`/speaker/talk/${id}`}>
          <IconLabel icon="fa fa-history" label="Show current version" />
        </Link>
        {cfpOpened && (
          <Button accent onClick={handleUpdateSubmission}>
            Update submission
          </Button>
        )}
      </Titlebar>
      <div className={styles.submission}>
        <div className={styles.header}>
          {state === SUBMISSION_STATES.ACCEPTED && (
            <div className={styles.notification}>
              <TalkDeliberation submissions={talk.submissions} />
            </div>
          )}
          <div className={styles.status}>
            {state !== SUBMISSION_STATES.ACCEPTED && (
              <TalkStatus talkId={talk.id} eventId={eventId} />
            )}
            <FormatBadge outline eventId={eventId} formatId={formats} />
            <CategoryBadge outline eventId={eventId} categoryId={categories} />
          </div>
        </div>
        <TalkAbstract
          className={styles.content}
          abstract={abstract}
          references={references}
          language={language}
          level={level}
        />
        <div className={styles.info}>
          <TalkSpeakers talkId={id} talkTitle={title} speakers={speakers} owner={owner} />
        </div>
      </div>
    </div>
  )
}

SubmissionPage.propTypes = {
  talkId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  onUpdateSubmission: PropTypes.func.isRequired,
  cfpOpened: PropTypes.bool,
}

SubmissionPage.defaultProps = {
  cfpOpened: false,
}

export default SubmissionPage
