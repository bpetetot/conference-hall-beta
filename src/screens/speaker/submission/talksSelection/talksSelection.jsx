import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import TalksSelectionTable from './talksSelectionTable.container'

import './talksSelection.css'

const TalksSelection = ({ name }) => (
  <div className="talks-selection">
    <Titlebar
      icon="fa fa-paper-plane"
      title={
        <span>
          Select a talk to submit to <span className="event-subtitle">{name}</span>
        </span>
      }
    />
    <TalksSelectionTable />
  </div>
)

TalksSelection.propTypes = {
  name: PropTypes.string,
}

TalksSelection.defaultProps = {
  name: '...',
}

export default TalksSelection
