import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'
import TalkCard from './talkCard'
import './talks.css'

const MyTalks = ({ talks }) => (
  <div>
    <div className="talks-header card">
      <h2>
        <IconLabel icon="fa fa-calendar-o" label="My talks" />
      </h2>
      <Link href="/speaker/talk/create" className="btn btn-primary btn-create-talk">
        <IconLabel icon="fa fa-calendar-plus-o" label="Create talk" />
      </Link>
    </div>
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
