import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { formatDate } from '../../../../helpers/date'
import './cfpBlock.css'

const renderCfpLabel = (cfpOpened, cfpFinished) => {
  if (cfpOpened) return 'is opened'
  if (cfpFinished) return 'is not open yet'
  return 'is closed'
}

const CfpBlock = ({ type, cfpStart, cfpEnd, cfpOpened, cfpFinished, className }) => {
  const start = formatDate(cfpStart, 'large')
  const end = formatDate(cfpEnd, 'large')

  return (
    <div
      className={cn('cfp-block', className, {
        'cfp-block-not-started': !cfpOpened && !cfpFinished,
        'cfp-block-opened': cfpOpened,
        'cfp-block-closed': cfpFinished,
      })}
    >
      <h2 className="cfp-block-title">Call for paper {renderCfpLabel(cfpOpened, cfpFinished)}</h2>
      {type === 'CONFERENCE' && (
        <p className="cfp-block-subtitle">
          {!cfpOpened && !!start && `Will open ${start}`}
          {cfpOpened && !!end && `Until ${end}`}
        </p>
      )}
    </div>
  )
}

CfpBlock.propTypes = {
  type: PropTypes.string,
  cfpStart: PropTypes.instanceOf(Date),
  cfpEnd: PropTypes.instanceOf(Date),
  cfpOpened: PropTypes.bool,
  cfpFinished: PropTypes.bool,
  className: PropTypes.string,
}

CfpBlock.defaultProps = {
  type: undefined,
  cfpStart: undefined,
  cfpEnd: undefined,
  cfpOpened: false,
  cfpFinished: false,
  className: undefined,
}

export default CfpBlock
