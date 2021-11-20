import React from 'react'
import { Link, useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import LoadingIndicator from 'components/loader'
import { useNotification } from 'app/layout/notification/context'
import {
  TalkAbstract,
  TalkSpeakers,
  TalkSubmissions,
  TalkDeliberationNotification,
} from 'features/talk'
import DeleteTalkButton from './delete'
import './talkPage.css'
import { useTalk, useUpdateTalk } from '../../../data/talk'

const TalkPage = () => {
  const { talkId } = useParams()
  const { data: talk, isLoading, isError, error } = useTalk(talkId)
  const { mutate: updateTalk } = useUpdateTalk(talkId)
  const { sendError } = useNotification()

  if (isLoading) {
    return <LoadingIndicator />
  }
  if (isError) {
    return <div>An unexpected error has occurred: {error.message}</div>
  }

  const toggleArchive = () =>
    updateTalk(
      { archived: !talk.archived },
      {
        onError: (err) => {
          sendError(`An unexpected error has occurred: ${err.message}`)
        },
      },
    )

  return (
    <div>
      <Titlebar icon="fa fa-microphone" title={talk.title}>
        {isEmpty(talk.proposals) && <DeleteTalkButton talkId={talk.id} talkTitle={talk.title} />}
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
      <TalkDeliberationNotification proposals={talk.proposals} />
      <div className="talk-page">
        <TalkAbstract
          className="talk-content"
          abstract={talk.abstract}
          references={talk.references}
          languages={talk.languages}
          level={talk.level}
        />
        <div className="talk-info">
          <TalkSpeakers
            talkId={talkId}
            talkTitle={talk.title}
            speakers={talk.speakers}
            ownerId={talk.ownerId}
            edit
          />
          <TalkSubmissions id={talkId} proposals={talk.proposals} />
        </div>
      </div>
    </div>
  )
}

export default TalkPage
