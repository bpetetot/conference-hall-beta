import React from 'react'
import PropTypes from 'prop-types'

function SideBarPanel({ label, children }) {
  return (
    <div className="sidebar-panel">
      <div className="sidebar-header">{label}</div>
      {children}
    </div>
  )
}

SideBarPanel.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node.isRequired,
}

SideBarPanel.defaultProps = {
  label: undefined,
}

export default SideBarPanel
