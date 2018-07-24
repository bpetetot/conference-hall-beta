import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import AvatarLabel from 'components/avatar/avatarLabel'
import Button from 'components/button'
import './inviteOrganizer.css'

const InviteOrganizer = ({
  displayName, photoURL, name, join, cancel,
}) => (
  <div className="invite-organizer">
    <Titlebar icon="fa fa-envelope-open" title="You're invite to join an organization">
      <Button onClick={cancel} secondary>
        Cancel
      </Button>
    </Titlebar>
    <div className="card">
      <AvatarLabel name={displayName} src={photoURL} suffix={`invites you to join the organization : ${name}`} className="invited-by" />
      <p>You&apos;re will be able to update the organization and invite members</p>
      <Button accent onClick={join} className="invite-join-btn">
        Join organization
      </Button>
    </div>
  </div>
)

InviteOrganizer.propTypes = {
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  name: PropTypes.string,
  join: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
}

InviteOrganizer.defaultProps = {
  name: undefined,
}

export default InviteOrganizer
