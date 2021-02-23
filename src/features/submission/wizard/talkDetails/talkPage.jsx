import React from 'react'
import PropTypes from 'prop-types'

import { useTalk } from 'data/talk'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { LoadingIndicator } from 'components/loader'
import { TalkAbstract, TalkSpeakers } from 'features/talk'

import './talkPage.css'

const TalkPage = ({ talkId, onNext }) => {
  const { data: talk } = useTalk(talkId)

  if (!talk) {
    return <LoadingIndicator />
  }
  return (
    <div className="talk-details">
      <Titlebar icon="fa fa-microphone" title={talk.title} className="talk-title">
        <Button accent onClick={onNext}>
          <IconLabel icon="fa fa-angle-right" label="Next" right />
        </Button>
      </Titlebar>
      <div className="talk-page">
        <TalkAbstract
          className="talk-content"
          abstract={talk.abstract}
          references={talk.references}
          language={talk.language}
          level={talk.level}
        />
        <TalkSpeakers
          className="talk-info"
          talkId={talk.id}
          ownerId={talk.ownerId}
          speakers={talk.speakers}
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
