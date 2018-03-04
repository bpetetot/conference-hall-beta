import React from 'react'
import PropTypes from 'prop-types'
import Titlebar from 'components/titlebar'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'

const OrganizationPage = ({ name, users }) => (
  <div className="organization-page">
    <Titlebar className="organization-header" icon="fa fa-users" title={name} />
    <List
      className="organization-content"
      array={users}
      noResult="No users yet !"
      renderRow={({ id, displayName, updateTimestamp }) => (
        <ListItem
          key={id}
          title={displayName}
          subtitle={<RelativeDate date={updateTimestamp} />}
        />
      )}
    />
  </div>
)

OrganizationPage.propTypes = {
  name: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
}

OrganizationPage.defaultProps = {
  users: [],
}

export default OrganizationPage
