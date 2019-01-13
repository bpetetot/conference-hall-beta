import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { TalkAbstract, TalkSpeakers, TalkStatus } from 'screens/components/talk'
import { FormatBadge, CategoryBadge } from 'screens/components/event/badges'
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
  formats,
  speakers,
  categories,
  opUpdateSubmission,
  cfpOpened,
}) => (
  <div>
    <Titlebar icon="fa fa-microphone" title={title}>
      <Link code="speaker-talk-page" talkId={id}>
        <IconLabel icon="fa fa-history" label="Show current version" />
      </Link>
      {cfpOpened && (
        <Button accent onClick={opUpdateSubmission}>
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
        level={level}
      />
      <div className={styles.info}>
        <TalkSpeakers speakers={speakers} owner={owner} />
      </div>
    </div>
  </div>
)

SubmissionPage.propTypes = {
  eventId: PropTypes.string.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  abstract: PropTypes.string,
  level: PropTypes.string,
  owner: PropTypes.string,
  state: PropTypes.string,
  references: PropTypes.string,
  formats: PropTypes.string,
  categories: PropTypes.string,
  speakers: PropTypes.objectOf(PropTypes.bool),
  opUpdateSubmission: PropTypes.func.isRequired,
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
  formats: undefined,
  categories: undefined,
  speakers: {},
  cfpOpened: false,
}

export default SubmissionPage
