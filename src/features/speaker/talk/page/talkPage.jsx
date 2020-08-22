import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import {
  TalkAbstract,
  TalkSpeakers,
  TalkSubmissions,
  TalkDeliberationNotification,
} from 'screens/components/talk'
import DeleteTalkButton from './delete'
import './talkPage.css'

const TalkPage = ({
  id,
  title,
  abstract,
  level,
  owner,
  references,
  language,
  speakers,
  submissions,
  toggleArchive,
  archived,
}) => (
  <div>
    <Titlebar icon="fa fa-microphone" title={title}>
      <DeleteTalkButton talkId={id} />
      {!archived && (
        <Button secondary onClick={toggleArchive}>
          <IconLabel icon="fa fa-archive" label="Archive" />
        </Button>
      )}
      <Button secondary>
        {(btn) => (
          <Link code="speaker-talk-edit" talkId={id} className={btn}>
            <IconLabel icon="fa fa-pencil" label="Edit" />
          </Link>
        )}
      </Button>
      {archived ? (
        <Button primary onClick={toggleArchive}>
          <IconLabel icon="fa fa-history" label="Restore" />
        </Button>
      ) : (
        <Button accent>
          {(btn) => (
            <Link code="speaker-talk-submission" talkId={id} className={btn}>
              <IconLabel icon="fa fa-paper-plane" label="Submit" />
            </Link>
          )}
        </Button>
      )}
    </Titlebar>
    <TalkDeliberationNotification submissions={submissions} />
    <div className="talk-page">
      <TalkAbstract
        className="talk-content"
        abstract={abstract}
        references={references}
        language={language}
        level={level}
      />
      <div className="talk-info">
        <TalkSpeakers talkId={id} talkTitle={title} speakers={speakers} owner={owner} edit />
        <TalkSubmissions id={id} submissions={submissions} />
      </div>
    </div>
  </div>
)

TalkPage.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string,
  level: PropTypes.string,
  owner: PropTypes.string,
  references: PropTypes.string,
  language: PropTypes.string,
  toggleArchive: PropTypes.func.isRequired,
  archived: PropTypes.bool,
  speakers: PropTypes.objectOf(PropTypes.bool),
  submissions: PropTypes.objectOf(PropTypes.any),
}

TalkPage.defaultProps = {
  abstract: undefined,
  level: 'not defined',
  owner: undefined,
  references: undefined,
  language: undefined,
  archived: undefined,
  speakers: {},
  submissions: {},
}

export default TalkPage
