import React from 'react'
import PropTypes from 'prop-types'

import { ListItem } from 'components/list'
import Avatar from 'components/avatar'
import Badge from 'components/badge'
import { ROLES } from 'firebase/constants'
import HasRole from 'features/organization/hasRole'

import ChangeRole from '../changeRole'
import RemoveMemberButton from '../removeMember'
import styles from './memberRow.module.css'

const MemberRow = ({ organizationId, member }) => {
  const { id, name, photoURL, role } = member

  return (
    <ListItem
      key={id}
      title={<Avatar name={name} src={photoURL} withLabel />}
      renderActions={() => (
        <div className={styles.actions}>
          <RemoveMemberButton organizationId={organizationId} member={member} />
          <HasRole
            of={ROLES.OWNER}
            forOrganizationId={organizationId}
            otherwise={
              <Badge light pill outline>
                {role}
              </Badge>
            }
          >
            <ChangeRole organizationId={organizationId} member={member} role={role} />
          </HasRole>
        </div>
      )}
    />
  )
}

MemberRow.propTypes = {
  organizationId: PropTypes.string.isRequired,
  member: PropTypes.object.isRequired,
  role: PropTypes.string,
}

MemberRow.defaultProps = {
  role: ROLES.REVIEWER,
}

export default MemberRow
