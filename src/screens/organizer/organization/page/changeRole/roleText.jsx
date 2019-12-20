import React from 'react'
import PropTypes from 'prop-types'

const RoleText = ({ displayName, role }) => {
  const title = `Set role “${role}” to “${displayName}” in the organization.`
  const subtitle = `The role “${role}” will allow to:`

  return (
    <>
      <p>{title}</p>
      <p>{subtitle}</p>
      {role === 'reviewer' && (
        <ul>
          <li>Review proposals</li>
        </ul>
      )}
      {role === 'member' && (
        <ul>
          <li>Mannage events of the organization</li>
          <li>Manage proposals</li>
          <li>Review proposals</li>
        </ul>
      )}
      {role === 'owner' && (
        <ul>
          <li>Manage the organization</li>
          <li>Mannage events of the organization</li>
          <li>Manage proposals</li>
          <li>Review proposals</li>
        </ul>
      )}
    </>
  )
}

RoleText.propTypes = {
  displayName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
}

export default RoleText
