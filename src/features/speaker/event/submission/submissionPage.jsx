import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { FormatBadge, CategoryBadge } from 'features/event/badges'
import { TalkAbstract, TalkSpeakers, TalkStatus } from 'screens/components/talk'
import Notification from 'screens/components/talk/deliberation/notification'

import styles from './submissionPage.module.css'

const SubmissionPage = ({
  eventId,
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
  onUpdateSubmission,
  cfpOpened,
}) => {
  const navigate = useNavigate()

  const handleUpdateSubmission = useCallback(() => {
    onUpdateSubmission()
    navigate(`/speaker/event/${eventId}/submission`)
  }, [onUpdateSubmission, navigate, eventId])

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
  eventId: PropTypes.string.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  abstract: PropTypes.string,
  level: PropTypes.string,
  owner: PropTypes.string,
  state: PropTypes.string,
  references: PropTypes.string,
  language: PropTypes.string,
  formats: PropTypes.string,
  categories: PropTypes.string,
  speakers: PropTypes.objectOf(PropTypes.bool),
  onUpdateSubmission: PropTypes.func.isRequired,
  cfpOpened: PropTypes.bool,
}

SubmissionPage.defaultProps = {
  id: undefined,
  title: undefined,
  abstract: undefined,
  level: 'not defined',
  owner: undefined,
  state: undefined,
  references: undefined,
  language: undefined,
  formats: undefined,
  categories: undefined,
  speakers: {},
  cfpOpened: false,
}

export default SubmissionPage
