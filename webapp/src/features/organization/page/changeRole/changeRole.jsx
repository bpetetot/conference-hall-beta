import React, { useState } from 'react'
import PropTypes from 'prop-types'
import capitalize from 'lodash/capitalize'

import { ConfirmationPopin } from 'components/portals'
import Badge from 'components/badge/badge'
import { ROLES } from 'features/organization/constants'
import { useAuth } from 'features/auth'

import RoleText from './roleText'
import { useUpdateMemberRole } from '../../../../data/organization'

const ChangeRoleSelect = ({ organizationId, member, role }) => {
  const { user } = useAuth()
  const [selectedRole, setSelectedRole] = useState(role)
  const { mutate } = useUpdateMemberRole(organizationId, member.id)
  const isYou = user.id === member.id
  if (isYou) {
    return (
      <Badge light pill outline>
        {role}
      </Badge>
    )
  }

  return (
    <ConfirmationPopin
      title="Change member role"
      content={<RoleText name={member.name} role={selectedRole} />}
      onOk={() => mutate(selectedRole)}
      onCancel={() => setSelectedRole(role)}
      withCancel
      renderTrigger={({ show }) => (
        <select
          value={selectedRole}
          aria-label="Change role"
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
  role: PropTypes.string.isRequired,
}

export default ChangeRoleSelect
