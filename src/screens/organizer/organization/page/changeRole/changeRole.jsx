import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ConfirmationPopin } from 'components/portals'

import RoleText from './roleText'

const ChangeRoleSelect = ({ displayName, role, isAuthenticatedUser, changeMemberRole }) => {
  const [selectedRole, setSelectedRole] = useState(role)

  if (isAuthenticatedUser) return null

  return (
    <ConfirmationPopin
      title="Change member role"
      content={<RoleText displayName={displayName} role={selectedRole} />}
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
  displayName: PropTypes.string,
  isAuthenticatedUser: PropTypes.bool.isRequired,
  role: PropTypes.string,
  changeMemberRole: PropTypes.func.isRequired,
}

ChangeRoleSelect.defaultProps = {
  displayName: undefined,
  role: 'reviewer',
}

export default ChangeRoleSelect
