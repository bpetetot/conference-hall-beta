import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { TalkAbstract, TalkSpeakers, TalkStatus } from 'screens/components/talk'
import Notification from 'screens/components/talk/deliberation/notification'
import './submissionPage.css'

const SubmissionPage = ({
  eventId,
  id,
  title,
  abstract,
  level,
  owner,
  state,
  references,
  speakers,
  opUpdateSubmission,
  cfpOpened,
}) => (
  <div>
    <Titlebar icon="fa fa-microphone" title={title}>
      <Button secondary>
        {btn => (
          <Link code="speaker-talk-page" talkId={id} className={btn}>
            <IconLabel icon="fa fa-history" label="Show current version" />
          </Link>
        )}
      </Button>
      {cfpOpened && (
        <Button accent onClick={opUpdateSubmission}>
          Update submission
        </Button>
      )}
    </Titlebar>
    <div className="talk-page">
      <div className="talk-header">
        {state === 'accepted' && <Notification eventId={eventId} talkId={id} />}
        {state !== 'accepted' && <TalkStatus talkId={id} eventId={eventId} />}
      </div>
      <TalkAbstract
        className="talk-content"
        abstract={abstract}
        references={references}
        level={level}
      />
      <div className="talk-info">
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
  speakers: {},
  cfpOpened: false,
}

export default SubmissionPage
