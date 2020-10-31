import React, { useState } from 'react'
import PropTypes from 'prop-types'
import capitalize from 'lodash/capitalize'

import { ConfirmationPopin } from 'components/portals'
import { ROLES } from 'firebase/constants'
import { useAuth } from 'features/auth'
import { useSetMembers } from 'features/organization/useOrganizations'

import RoleText from './roleText'

const ChangeRoleSelect = ({ organizationId, member, role }) => {
  const { user } = useAuth()

  const [selectedRole, setSelectedRole] = useState(role)
  const [updateMember] = useSetMembers(organizationId)

  if (user.uid === member.uid) return null

  return (
    <ConfirmationPopin
      title="Change member role"
      content={<RoleText displayName={member.displayName} role={selectedRole} />}
      onOk={() => {
        updateMember({ memberId: member.uid, role: selectedRole })
      }}
      onCancel={() => setSelectedRole(role)}
      withCancel
      renderTrigger={({ show }) => (
        <select
          value={selectedRole}
          onChange={(e) => {
            e.stopPropagation()
            setSelectedRole(e.target.value)
            show()
          }}
        >
          {Object.values(ROLES).map((roleOption) => (
            <option key={roleOption} value={roleOption}>
              {capitalize(roleOption)}
            </option>
          ))}
        </select>
      )}
    />
  )
}

ChangeRoleSelect.propTypes = {
  organizationId: PropTypes.string.isRequired,
  member: PropTypes.object.isRequired,
  role: PropTypes.string,
}

ChangeRoleSelect.defaultProps = {
  role: ROLES.REVIEWER,
}

export default ChangeRoleSelect
