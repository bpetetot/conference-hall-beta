import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AppLayout from 'app/layout'
import Button from 'components/button'
import Titlebar from 'components/titlebar'

import useValidationInvite from './useValidationInvite'
import styles from './invite.module.css'

function InvitePage() {
  const navigate = useNavigate()
  const { inviteId } = useParams()
  const { invitation, loading, validate } = useValidationInvite(inviteId, navigate)

  if (!invitation) return null

  const { entity } = invitation
  return (
    <AppLayout>
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
              {(btn) => (
                <Link to="/" className={btn}>
                  Cancel
                </Link>
              )}
            </Button>
            <Button onClick={validate} disabled={loading} loading={loading}>
              {entity === 'talk' ? 'Be co-speaker' : 'Join organization'}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default InvitePage
