import React from 'react'
import Titlebar from 'components/titlebar'
import { Link } from 'redux-little-router'
import IconLabel from 'components/iconLabel'

const MyOrganizations = () => (
  <div className="organizations-page">
    <Titlebar className="organizations-header" icon="fa fa-users" title="My organizations">
      <Link href="/organizer/organization/create" className="btn">
        <IconLabel icon="fa fa-users" label="Create organization" />
      </Link>
    </Titlebar>
  </div>
)

MyOrganizations.propTypes = {}

MyOrganizations.defaultProps = {}

export default MyOrganizations
