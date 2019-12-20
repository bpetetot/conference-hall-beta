import React from 'react'
import PropTypes from 'prop-types'

import { ListItem } from 'components/list'
import Avatar from 'components/avatar/avatar'
import HasRole from 'screens/components/hasRole'

import ChangeRole from '../changeRole'
import RemoveMemberButton from '../removeMember'
import styles from './memberRow.module.css'

const MemberRow = ({ organizationId, user, role, isOwner, removeMember, authUserId }) => {
  const { uid, displayName, photoURL } = user
  if (!displayName) return null

  return (
    <ListItem
      key={uid}
      title={<Avatar name={displayName} src={photoURL} withLabel />}
      renderActions={() => (
        <div className={styles.actions}>
          <HasRole of={['owner']} forOrganizationId={organizationId}>
            <ChangeRole organizationId={organizationId} user={user} role={role} />
          </HasRole>
          <RemoveMemberButton
            user={user}
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
  user: PropTypes.object.isRequired,
  role: PropTypes.string,
  isOwner: PropTypes.bool.isRequired,
  removeMember: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
}

MemberRow.defaultProps = {
  role: 'reviewer',
}

export default MemberRow
