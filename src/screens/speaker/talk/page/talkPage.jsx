import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'

import './talkPage.css'

const TalkPage = ({ title, abstract, references }) => (
  <div className="talk-page">
    <div className="talk-header card">
      <h2>{title}</h2>
      <Link href="/speaker/talk/id/edit" className="btn btn-primary">
        <IconLabel icon="fa fa-pencil" label="Edit" />
      </Link>
    </div>
    <div className="talk-content">
      <div className="talk-data card">
        <h2>Abstract</h2>
        {abstract && <Markdown className="markdown" source={abstract} escapeHtml />}
        <h2>References</h2>
        {references && <Markdown className="markdown" source={references} escapeHtml />}
      </div>
      <div className="talk-submissions card">
        <h2>Submissions</h2>
        <small>No submission yet</small>
      </div>
    </div>
  </div>
)

TalkPage.propTypes = {
  title: PropTypes.string,
  abstract: PropTypes.string,
  references: PropTypes.string,
}

TalkPage.defaultProps = {
  title: undefined,
  abstract: undefined,
  references: undefined,
}

export default TalkPage
