import React from 'react'
import PropTypes from 'prop-types'

import { ListItem } from 'components/list'
import Avatar from 'components/avatar/avatar'
import HasRole from 'screens/components/hasRole'

import ChangeRole from '../changeRole'
import RemoveMemberButton from '../removeMember'
import styles from './memberRow.module.css'

const MemberRow = ({
  organizationId,
  uid,
  displayName,
  photoURL,
  role,
  isOwner,
  removeMember,
  authUserId,
}) => {
  if (!displayName) return null

  return (
    <ListItem
      key={uid}
      title={<Avatar name={displayName} src={photoURL} withLabel />}
      renderActions={() => (
        <div className={styles.actions}>
          <HasRole of={['owner']} forOrganizationId={organizationId}>
            <ChangeRole organizationId={organizationId} uid={uid} role={role} />
          </HasRole>
          <RemoveMemberButton
            uid={uid}
            displayName={displayName}
            isOwner={isOwner}
            removeMember={removeMember}
            authUserId={authUserId}
          />
        </div>
      )}
    />
  )
}

MemberRow.propTypes = {
  organizationId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  role: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  removeMember: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
}

MemberRow.defaultProps = {
  displayName: undefined,
  photoURL: undefined,
}

export default MemberRow
