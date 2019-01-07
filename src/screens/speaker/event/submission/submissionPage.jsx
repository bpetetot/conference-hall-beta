import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import { TalkAbstract, TalkSpeakers } from 'screens/components/talk'
import './submissionPage.css'

const SubmissionPage = ({
  title,
  abstract,
  level,
  owner,
  references,
  speakers,
}) => (
  <div>
    <Titlebar icon="fa fa-microphone" title={title} />
    <div className="talk-page">
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
  title: PropTypes.string,
  abstract: PropTypes.string,
  level: PropTypes.string,
  owner: PropTypes.string,
  references: PropTypes.string,
  speakers: PropTypes.objectOf(PropTypes.bool),
}

SubmissionPage.defaultProps = {
  title: undefined,
  abstract: undefined,
  level: 'not defined',
  owner: undefined,
  references: undefined,
  speakers: {},
}

export default SubmissionPage
