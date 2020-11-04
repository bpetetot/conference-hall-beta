import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from 'components/loader'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import TalkSpeakers from 'features/talk/components/speakers'
import TalkAbstract from 'features/talk/components/abstract'
import TalkStatus from 'features/talk/components/status'
import { useTalk } from 'features/talk/useTalks'
import { useCurrentEvent } from 'features/event/currentEventContext'

import './talkPage.css'

const TalkPage = ({ talkId, onNext }) => {
  const { data: event } = useCurrentEvent()
  const { data: talk, isLoading: isLoadingTalk } = useTalk(talkId)

  if (isLoadingTalk) return <LoadingIndicator />

  const existing = talk.getSubmission(event.id)

  const { title, abstract, level, owner, references, language, speakers } = existing || talk

  const titleComponent = (
    <div className="talk-title">
      <span>{title}</span>
      <TalkStatus talkId={talkId} eventId={event.id} className="talk-status" />
    </div>
  )

  return (
    <div className="talk-details">
      <Titlebar icon="fa fa-microphone" title={titleComponent} className="talk-title">
        <Button accent onClick={onNext}>
          <IconLabel icon="fa fa-angle-right" label="Next" right />
        </Button>
      </Titlebar>
      <div className="talk-page">
        <TalkAbstract
          className="talk-content"
          abstract={abstract}
          references={references}
          language={language}
          level={level}
        />
        <TalkSpeakers
          className="talk-info"
          talkId={talkId}
          talkTitle={title}
          owner={owner}
          speakers={speakers}
        />
      </div>
    </div>
  )
}

TalkPage.propTypes = {
  talkId: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
}

export default TalkPage
