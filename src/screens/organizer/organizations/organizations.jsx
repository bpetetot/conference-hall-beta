import React from 'react'
import Titlebar from 'components/titlebar'

const MyOrganizations = () => (
  <div className="organizations-page">
    <Titlebar className="organizations-header" icon="fa fa-users" title="My organizations" />
  </div>
)

MyOrganizations.propTypes = {}

MyOrganizations.defaultProps = {}

export default MyOrganizations
