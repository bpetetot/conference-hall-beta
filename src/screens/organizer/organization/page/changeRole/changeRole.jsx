import React, { useState } from 'react'
import PropTypes from 'prop-types'
import capitalize from 'lodash/capitalize'

import { ConfirmationPopin } from 'components/portals'
import { ROLES } from 'firebase/constants'

import RoleText from './roleText'

const ChangeRoleSelect = ({ user, role, isAuthenticatedUser, changeMemberRole }) => {
  const [selectedRole, setSelectedRole] = useState(role)

  if (isAuthenticatedUser) return null

  return (
    <ConfirmationPopin
      title="Change member role"
      content={<RoleText displayName={user.displayName} role={selectedRole} />}
      onOk={() => changeMemberRole(selectedRole)}
      onCancel={() => setSelectedRole(role)}
      withCancel
      renderTrigger={({ show }) => (
        <select
          value={selectedRole}
          onChange={e => {
            e.stopPropagation()
            setSelectedRole(e.target.value)
            show()
          }}
        >
          {Object.values(ROLES).map(roleOption => (
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
  user: PropTypes.object.isRequired,
  isAuthenticatedUser: PropTypes.bool.isRequired,
  role: PropTypes.string,
  changeMemberRole: PropTypes.func.isRequired,
}

ChangeRoleSelect.defaultProps = {
  role: ROLES.REVIEWER,
}

export default ChangeRoleSelect
