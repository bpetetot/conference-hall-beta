import React from 'react'
import PropTypes from 'prop-types'

import { ROLES } from 'features/organization/constants'

const RoleText = ({ name, role }) => {
  const title = `Set role “${role}” to “${name}” in the organization.`
  const subtitle = `The role “${role}” will allow to:`

  return (
    <>
      <p>{title}</p>
      <p>{subtitle}</p>
      {role === ROLES.REVIEWER && (
        <ul>
          <li>Review proposals</li>
        </ul>
      )}
      {role === ROLES.MEMBER && (
        <ul>
          <li>Manage events of the organization</li>
          <li>Manage proposals</li>
          <li>Review proposals</li>
        </ul>
      )}
      {role === ROLES.OWNER && (
        <ul>
          <li>Manage the organization</li>
          <li>Manage events of the organization</li>
          <li>Manage proposals</li>
          <li>Review proposals</li>
        </ul>
      )}
    </>
  )
}

RoleText.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
}

export default RoleText
