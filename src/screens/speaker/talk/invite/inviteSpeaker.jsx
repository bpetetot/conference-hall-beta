import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import UserAvatar from 'screens/components/userAvatar'
import Button from 'components/button'
import './inviteSpeaker.css'

const InviteSpeaker = ({ uidInvite, title, join, cancel }) => (
  <div className="invite-speaker">
    <Titlebar icon="fa fa-envelope-open" title="You're invite to be co-speaker">
      <Button secondary onClick={cancel}>
        Cancel
      </Button>
    </Titlebar>
    <div className="card">
      <UserAvatar id={uidInvite} suffix="invites you to join the talk :" className="invited-by" />
      <h2>
        <IconLabel icon="fa fa-microphone" label={title} />
      </h2>
      <p>You&apos;re will be able to update it and submit to any event.</p>
      <Button accent onClick={join} className="invite-join-btn">
        Join as co-speaker
      </Button>
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
