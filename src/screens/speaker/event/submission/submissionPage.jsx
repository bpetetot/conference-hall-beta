import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import { TalkAbstract, TalkSpeakers, TalkStatus } from 'screens/components/talk'
import './submissionPage.css'

const SubmissionPage = ({
  eventId, id, title, abstract, level, owner, references, speakers,
}) => (
  <div>
    <Titlebar icon="fa fa-microphone" title={title}>
      <Link code="speaker-talk-page" talkId={id}>
        <IconLabel icon="fa fa-history" label="Show current version" />
      </Link>
    </Titlebar>
    <div className="talk-page">
      <div className="talk-header">
        <TalkStatus talkId={id} eventId={eventId} />
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
  references: PropTypes.string,
  speakers: PropTypes.objectOf(PropTypes.bool),
}

SubmissionPage.defaultProps = {
  id: undefined,
  title: undefined,
  abstract: undefined,
  level: 'not defined',
  owner: undefined,
  references: undefined,
  speakers: {},
}

export default SubmissionPage
