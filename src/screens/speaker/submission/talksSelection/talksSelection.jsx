import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import { Stepper0 } from 'components/stepper'
import TalksSelectionTable from './talksSelectionTable.container'

import './talksSelection.css'

const TalksSelection = ({ name }) => (
  <div className="talks-selection">
    <Titlebar
      icon="fa fa-paper-plane"
      title={
        <span>
          Submit to <span className="event-subtitle">{name}</span>
        </span>
      }
    />
    <Stepper0 />
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
