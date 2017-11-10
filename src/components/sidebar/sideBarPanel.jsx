import React from 'react'
import PropTypes from 'prop-types'

const SideBarPanel = ({ label, children }) => (
  <div className="sidebar-panel">
    <div className="sidebar-header">{label}</div>
    {children}
  </div>
)

SideBarPanel.propTypes = {
  label: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
}

export default SideBarPanel
