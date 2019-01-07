import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import SubmitTalkLink from 'screens/components/submitTalksLink'

const Submissions = ({ eventId }) => (
  <div>
    <Titlebar icon="fa fa-inbox" title="My submissions">
      <SubmitTalkLink eventId={eventId} />
    </Titlebar>
  </div>
)

Submissions.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default Submissions
