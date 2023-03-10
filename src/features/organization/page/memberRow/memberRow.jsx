import React from 'react'
import PropTypes from 'prop-types'

import { ListItem } from 'components/list'
import Avatar from 'components/avatar'
import Badge from 'components/badge'
import HasRole from 'features/organization/hasRole'
import { ROLES } from 'firebase/constants'

import ChangeRole from '../changeRole'
import RemoveMemberButton from '../removeMember'
import styles from './memberRow.module.css'

function MemberRow({ organizationId, user, role, isOwner, authUserId }) {
  const { uid, displayName, photoURL } = user
  if (!displayName) return null

  return (
    <ListItem
      key={uid}
      title={<Avatar name={displayName} src={photoURL} withLabel />}
      renderActions={() => (
        <div className={styles.actions}>
          <RemoveMemberButton
            organizationId={organizationId}
            user={user}
            isOwner={isOwner}
            authUserId={authUserId}
          />
          <HasRole
            of={ROLES.OWNER}
            forOrganizationId={organizationId}
            otherwise={
              <Badge light pill outline>
                {role}
              </Badge>
            }
          >
            <ChangeRole organizationId={organizationId} user={user} role={role} />
          </HasRole>
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
  authUserId: PropTypes.string.isRequired,
}

MemberRow.defaultProps = {
  role: ROLES.REVIEWER,
}

export default MemberRow
