import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import TalkCard from './talkCard'
import './talks.css'

const MyTalks = ({ talks }) => (
  <div className="talks-page">
    <Titlebar icon="fa fa-microphone" title="My talks">
      <Link href="/speaker/talk/create" className="btn btn-primary btn-create-talk">
        <IconLabel icon="fa fa-calendar-plus-o" label="Create talk" />
      </Link>
    </Titlebar>
    <div className="talks-content card">
      {talks.length === 0 && (
        <div className="no-talks">
          <h3>No talk yet !</h3>
        </div>
      )}
      {talks.map(id => <TalkCard key={id} id={id} />)}
    </div>
  </div>
)

MyTalks.propTypes = {
  talks: PropTypes.arrayOf(PropTypes.string),
}

MyTalks.defaultProps = {
  talks: [],
}

export default MyTalks
