import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { LoadingIndicator } from 'components/loader'
import {
  TalkAbstract,
  TalkSpeakers,
  TalkSubmissions,
  TalkDeliberationNotification,
} from 'features/talk'
import DeleteTalkButton from './delete'
import './talkPage.css'
import { useTalk } from '../useTalks'

const TalkPage = ({ toggleArchive }) => {
  const { data, isLoading } = useTalk()

  if (isLoading) return <LoadingIndicator />

  const {
    id,
    title,
    abstract,
    level,
    owner,
    references,
    language,
    speakers,
    submissions,
    archived,
  } = data

  return (
    <div>
      <Titlebar icon="fa fa-microphone" title={title}>
        <DeleteTalkButton talkId={id} talkTitle={title} />
        {!archived && (
          <Button secondary onClick={() => toggleArchive(data)}>
            <IconLabel icon="fa fa-archive" label="Archive" />
          </Button>
        )}
        <Button secondary>
          {(btn) => (
            <Link to="edit" className={btn}>
              <IconLabel icon="fa fa-pencil" label="Edit" />
            </Link>
          )}
        </Button>
        {archived ? (
          <Button primary onClick={() => toggleArchive(data)}>
            <IconLabel icon="fa fa-history" label="Restore" />
          </Button>
        ) : (
          <Button accent>
            {(btn) => (
              <Link to="submission" className={btn}>
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
}

TalkPage.propTypes = {
  toggleArchive: PropTypes.func.isRequired,
}

export default TalkPage
