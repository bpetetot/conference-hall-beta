import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import Button from 'components/button'
import Titlebar from 'components/titlebar'
import inviteReq from 'firebase/invites'

import styles from './invitePage.module.css'

const InvitePage = ({ entity, inviteId, invite }) => {
  const [invitation, setInvitation] = useState(null)

  useEffect(() => {
    inviteReq.read(inviteId).then(ref => setInvitation(ref.data()))
  }, [inviteId])

  if (!invitation) return null

  return (
    <div className={styles.wrapper}>
      <div className="card">
        {entity === 'talk' ? (
          <>
            <Titlebar icon="fa fa-microphone" title="Co-speaker invitation" />
            <p>You have been invited to be co-speaker to the talk</p>
          </>
        ) : (
          <>
            <Titlebar icon="fa fa-users" title="Organization invitation" />
            <p>You have been invited to join the organization</p>
          </>
        )}
        <p>
          <strong>{invitation.entityTitle}</strong>
        </p>
        <div className={styles.buttons}>
          <Button secondary>
            {btn => (
              <Link code="home" className={btn}>
                Cancel
              </Link>
            )}
          </Button>
          <Button onClick={invite}>Join organization</Button>
        </div>
      </div>
    </div>
  )
}

InvitePage.propTypes = {
  entity: PropTypes.string.isRequired,
  inviteId: PropTypes.string.isRequired,
  invite: PropTypes.func.isRequired,
}

export default InvitePage
