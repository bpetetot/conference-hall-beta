import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from 'components/loader'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { TalkAbstract, TalkSpeakers, TalkStatus } from 'features/talk'
import { useTalk } from 'features/talk/useTalks'

import './talkPage.css'

const TalkPage = ({ talkId, eventId, onNext }) => {
  const { data: talk, isLoading: isLoadingTalk } = useTalk(talkId)

  if (isLoadingTalk) return <LoadingIndicator />

  const existing = talk.getSubmission(eventId)

  const { title, abstract, level, owner, references, language, speakers } = existing || talk

  const titleComponent = (
    <div className="talk-title">
      <span>{title}</span>
      <TalkStatus talk={talk} eventId={eventId} className="talk-status" />
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
  eventId: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
}

export default TalkPage
