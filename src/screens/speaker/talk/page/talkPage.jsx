import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'

import './talkPage.css'

const TalkPage = ({
  id, title, abstract, level, references,
}) => (
  <div className="talk-page">
    <div className="talk-header card">
      <h2>{title}</h2>
      <div className="talk-toolbar">
        <Link href={`/speaker/talk/${id}/edit`} className="btn btn-primary">
          <IconLabel icon="fa fa-pencil" label="Edit" />
        </Link>
      </div>
    </div>
    <div className="talk-content card">
      <p>Level : {level}</p>
      <h3>Abstract</h3>
      {abstract && <Markdown className="markdown" source={abstract} escapeHtml />}
      <h3>References</h3>
      {references && <Markdown className="markdown" source={references} escapeHtml />}
    </div>
    <div className="talk-proposals card">
      <h3>Proposals</h3>
      <small>No proposal yet</small>
    </div>
  </div>
)

TalkPage.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string,
  level: PropTypes.string,
  references: PropTypes.string,
}

TalkPage.defaultProps = {
  abstract: undefined,
  level: 'not defined',
  references: undefined,
}

export default TalkPage
