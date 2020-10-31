import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from 'components/loader'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { TalkAbstract, TalkSpeakers } from 'features/talk'
import { useSubmission } from 'features/submission/useSubmissions'
import { useTalk } from 'features/talk/useTalks'

import TalkTitle from './talkTitle'
import './talkPage.css'

const TalkPage = ({ talkId, eventId, onNext }) => {
  const { data: existing, isLoading: isLoadingSubmission } = useSubmission(talkId, eventId)
  const { data: talk, isLoading: isLoadingTalk } = useTalk(talkId)

  if (isLoadingSubmission || isLoadingTalk) return <LoadingIndicator />

  const { title, abstract, level, owner, references, language, speakers } = existing || talk

  const titleComponent = <TalkTitle talkId={talkId} eventId={eventId} title={title} />

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
