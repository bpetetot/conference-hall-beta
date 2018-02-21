import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Speaker from 'screens/components/speaker'
import './inviteSpeaker.css'

const InviteSpeaker = ({
  uidInvite, title, join, cancel,
}) => (
  <div className="invite-speaker">
    <Titlebar icon="fa fa-envelope-open" title="You're invite to be co-speaker">
      <button onClick={cancel} className="btn btn-default">
        Cancel
      </button>
    </Titlebar>
    <div className="card">
      <Speaker id={uidInvite} suffix="invites you to join the talk :" className="invited-by" />
      <h2><IconLabel icon="fa fa-microphone" label={title} /></h2>
      <p>You&apos;re will be able to update it and submit to any event.</p>
      <button onClick={join} className="btn btn-primary invite-join-btn">
        Join as co-speaker
      </button>
    </div>
  </div>
)

InviteSpeaker.propTypes = {
  uidInvite: PropTypes.string.isRequired,
  title: PropTypes.string,
  join: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
}

InviteSpeaker.defaultProps = {
  title: undefined,
}

export default InviteSpeaker
