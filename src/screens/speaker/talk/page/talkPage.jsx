import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import { Link } from 'redux-little-router'
import isEmpty from 'lodash/isEmpty'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Badge from 'components/badge'
import SubmitTalkButton from './submitTalkButton'
import Speaker from './speaker'
import Submission from './submission'

import './talkPage.css'

const TalkPage = ({
  id, title, abstract, level, references, speakers, submissions,
}) => (
  <div>
    <Titlebar icon="fa fa-microphone" title={title}>
      <SubmitTalkButton talkId={id} />
      <Link href={`/speaker/talk/${id}/edit`} className="btn">
        <IconLabel icon="fa fa-pencil" label="Edit" />
      </Link>
    </Titlebar>
    <div className="talk-page">
      <div className="talk-content card">
        <h3>Abstract</h3>
        {abstract && <Markdown className="markdown" source={abstract} escapeHtml />}
        <h3 className="margin-gap">References</h3>
        {references && <Markdown className="markdown" source={references} escapeHtml />}
      </div>
      <div className="talk-info">
        <div className="card">
          <h3>Speakers & Details</h3>
          {Object.keys(speakers).map(key => <Speaker key={key} id={key} />)}
          <Badge>Level {level}</Badge>
        </div>
        <div className="card margin-gap">
          <h3>Submissions</h3>
          {isEmpty(submissions) && <small>Not submitted yet</small>}
          {!isEmpty(submissions) && (
            <div className="talk-submissions">
              {Object.keys(submissions).map(eventId => (
                <Submission key={eventId} eventId={eventId} talkId={id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)

TalkPage.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string,
  level: PropTypes.string,
  references: PropTypes.string,
  speakers: PropTypes.objectOf(PropTypes.bool),
  submissions: PropTypes.objectOf(PropTypes.any),
}

TalkPage.defaultProps = {
  abstract: undefined,
  level: 'not defined',
  references: undefined,
  speakers: {},
  submissions: {},
}

export default TalkPage
