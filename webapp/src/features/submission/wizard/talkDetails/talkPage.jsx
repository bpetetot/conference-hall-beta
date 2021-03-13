import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { TalkAbstract, TalkSpeakers } from 'features/talk'

import './talkPage.css'
import { useWizard } from '../context'

const TalkPage = ({ talk }) => {
  const { nextStep } = useWizard()
  return (
    <div className="talk-details">
      <Titlebar icon="fa fa-microphone" title={talk.title} className="talk-title">
        <Button accent onClick={nextStep}>
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
          talkId={String(talk.id)}
          ownerId={talk.ownerId}
          speakers={talk.speakers}
        />
      </div>
    </div>
  )
}

TalkPage.propTypes = {
  talk: PropTypes.object.isRequired,
}

export default TalkPage
