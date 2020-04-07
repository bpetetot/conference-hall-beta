import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import Button from 'components/button'
import Titlebar from 'components/titlebar'

import useValidationInvite from './useValidationInvite'
import styles from './invitePage.module.css'

const InvitePage = ({ inviteId, push }) => {
  const { invitation, loading, validate } = useValidationInvite(inviteId, push)

  if (!invitation) return null

  const { entity } = invitation
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
            {(btn) => (
              <Link code="home" className={btn}>
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
  )
}

InvitePage.propTypes = {
  inviteId: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
}

export default InvitePage
