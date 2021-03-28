import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AppLayout from 'app/layout'
import Button from 'components/button'
import Titlebar from 'components/titlebar'
import { useInvite, useValidateInvite } from 'data/invite'
import { NotificationProvider, useNotification } from 'app/layout/notification/context'
import styles from './invite.module.css'

const InvitePage = () => {
  const navigate = useNavigate()
  const { sendError } = useNotification()
  const { inviteId } = useParams()

  const { data: invitation } = useInvite(inviteId)
  const { mutate: validateInvite, isLoading } = useValidateInvite(inviteId)

  if (!invitation) return null

  const { type, label, entityId } = invitation

  const onValidateInvite = () => {
    validateInvite(undefined, {
      onError: (err) => sendError(`An unexpected error has occurred: ${err.message}`),
      onSuccess: () => {
        if (type === 'SPEAKER') navigate(`/speaker/talk/${entityId}`)
        if (type === 'ORGANIZATION') navigate(`/organizer/organization/${entityId}`)
      },
    })
  }

  return (
    <AppLayout>
      <div className={styles.wrapper}>
        <div className="card">
          {type === 'SPEAKER' ? (
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
            <strong>{label}</strong>
          </p>
          <div className={styles.buttons}>
            <Button secondary>
              {(btn) => (
                <Link to="/" className={btn}>
                  Cancel
                </Link>
              )}
            </Button>
            <Button onClick={onValidateInvite} disabled={isLoading} loading={isLoading}>
              {type === 'SPEAKER' ? 'Be co-speaker' : 'Join organization'}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default () => (
  <NotificationProvider>
    <InvitePage />
  </NotificationProvider>
)
