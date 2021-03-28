import React from 'react'
import PropTypes from 'prop-types'

import CopyInput from 'components/copyInput'
import Button from 'components/button'
import IconLabel from 'components/iconLabel/iconLabel'

import styles from './inviteLink.module.css'

const InviteLink = ({ inviteUrl, onGenerateInvite, onRevokeInvite, isLoadingInvite }) => {
  if (!inviteUrl || isLoadingInvite) {
    return (
      <Button onClick={onGenerateInvite} disabled={isLoadingInvite}>
        <IconLabel icon="fa fa-link" label="Generate an invitation link" />
      </Button>
    )
  }

  return (
    <div className={styles.inviteLink}>
      <CopyInput title="Invitation link" value={inviteUrl} />
      <Button simple size="small" onClick={onRevokeInvite} className={styles.revokeBtn}>
        <IconLabel icon="fa fa-ban" label="Revoke invitation link" />
      </Button>
    </div>
  )
}

InviteLink.propTypes = {
  inviteUrl: PropTypes.string,
  isLoadingInvite: PropTypes.bool,
  onGenerateInvite: PropTypes.func.isRequired,
  onRevokeInvite: PropTypes.func.isRequired,
}

InviteLink.defaultProps = {
  isLoadingInvite: false,
  inviteUrl: undefined,
}

export default InviteLink
