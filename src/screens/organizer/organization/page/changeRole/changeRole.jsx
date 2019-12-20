import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ConfirmationPopin } from 'components/portals'

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
          <option key="owner" value="owner">
            Owner
          </option>
          <option key="member" value="member">
            Member
          </option>
          <option key="reviewer" value="reviewer">
            Reviewer
          </option>
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
  role: 'reviewer',
}

export default ChangeRoleSelect
