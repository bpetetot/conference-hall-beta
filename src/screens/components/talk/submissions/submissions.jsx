import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { Link } from 'redux-little-router'
import IconLabel from 'components/iconLabel'

import Submission from './submission'

const TalkSubmissions = ({ id, submissions, className }) => (
  <div className={cn('card', className)}>
    <h3>Submissions</h3>
    {isEmpty(submissions) && <small>Not submitted yet</small>}
    {!isEmpty(submissions) && (
      <div className="talk-submissions">
        {Object.keys(submissions).map(eventId => (
          <Submission key={eventId} eventId={eventId} talkId={id} />
        ))}
      </div>
    )}
    <Link href={`/speaker/talk/${id}/submission`} className="btn">
      <IconLabel icon="fa fa-paper-plane" label="Submit" />
    </Link>
  </div>
)

TalkSubmissions.propTypes = {
  id: PropTypes.string.isRequired,
  submissions: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
}

TalkSubmissions.defaultProps = {
  submissions: {},
  className: undefined,
}

export default TalkSubmissions
