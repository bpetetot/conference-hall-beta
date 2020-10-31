import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'

import { LoadingIndicator } from 'components/loader'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { FormatBadge, CategoryBadge } from 'features/event/badges'
import { TalkAbstract, TalkSpeakers, TalkStatus } from 'features/talk'
import Notification from 'features/talk/deliberation/notification'

import { useSubmission } from '../useSubmissions'
import styles from './submissionPage.module.css'

const SubmissionPage = ({ talkId, eventId, onUpdateSubmission, cfpOpened }) => {
  const navigate = useNavigate()

  const { data: submission, isLoading } = useSubmission(talkId, eventId)

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
  } = submission

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
          {state === 'accepted' && (
            <div className={styles.notification}>
              <Notification eventId={eventId} talkId={id} />
            </div>
          )}
          <div className={styles.status}>
            {state !== 'accepted' && <TalkStatus talkId={id} eventId={eventId} />}
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
