import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import Titlebar from 'components/titlebar'
import { Stepper2 } from 'components/stepper'

import './talkSubmitted.css'

const TalkSubmitted = ({ name }) => (
  <div className="talk-submitted">
    <Titlebar
      icon="fa fa-paper-plane"
      title={
        <span>
          Submit to <span className="event-subtitle">{name}</span>
        </span>
      }
    />
    <Stepper2 />
    <div className="icon-submitted">
      <i className="fa fa-paper-plane-o" />
      <h2>Congrats ! Talk successfully submitted to {name}</h2>
      <Link href="/speaker/talks/submit">Want to submit an other talk ?</Link>
    </div>
  </div>
)

TalkSubmitted.propTypes = {
  name: PropTypes.string,
}

TalkSubmitted.defaultProps = {
  name: '...',
}

export default TalkSubmitted
