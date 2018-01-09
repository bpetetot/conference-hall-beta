import React from 'react'
import { Link } from 'redux-little-router'

import './submission.css'

const Submission = ({ talkId, name }) => (
  <div className="talk-submission-event">
    <Link href={`/speaker/talk/${talkId}/submit`}>{name}</Link>
  </div>
)

export default Submission
