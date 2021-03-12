import React from 'react'
// import { useParams } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import {
  TalkAbstract,
  TalkSpeakers,
  TalkSubmissions,
  // TalkDeliberationNotification,
} from 'features/talk'
import DeleteTalkButton from './delete'
import './talkPage.css'
import { useTalk, useUpdateTalk } from '../../../data/talk'

const TalkPage = () => {
  const { talkId } = useParams()
  const { data: talk, isLoading } = useTalk(talkId)
  const { mutate: updateTalk } = useUpdateTalk(talkId)

  const toggleArchive = () => {
    updateTalk({ archived: !talk.archived })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Titlebar icon="fa fa-microphone" title={talk.title}>
        <DeleteTalkButton talkId={talk.id} talkTitle={talk.title} />
        {!talk.archived && (
          <Button secondary onClick={toggleArchive}>
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
        {talk.archived ? (
          <Button primary onClick={toggleArchive}>
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
      {/* <TalkDeliberationNotification submissions={talk.submissions} /> */}
      <div className="talk-page">
        <TalkAbstract
          className="talk-content"
          abstract={talk.abstract}
          references={talk.references}
          language={talk.language}
          level={talk.level}
        />
        <div className="talk-info">
          <TalkSpeakers
            talkId={talk.id}
            talkTitle={talk.title}
            speakers={talk.speakers}
            ownerId={talk.ownerId}
            edit
          />
          <TalkSubmissions id={talk.id} proposals={talk.proposals} />
        </div>
      </div>
    </div>
  )
}

export default TalkPage
