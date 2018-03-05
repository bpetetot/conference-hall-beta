import React from 'react'
import PropTypes from 'prop-types'
import Titlebar from 'components/titlebar'
import Avatar from 'components/avatar'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'

import './organizationPage.css'

const OrganizationPage = ({ name, users }) => (
  <div className="organization-page">
    <Titlebar className="organization-header" icon="fa fa-users" title={name} />
    <List
      className="organization-content"
      array={users}
      noResult="No users yet !"
      renderRow={({
        id,
        displayName,
        photoURL,
        updateTimestamp,
      }) => (
        <ListItem
          key={id}
          title={(
            <div className="member">
              <Avatar displayName={displayName} photoURL={photoURL} />
              <span>{displayName}</span>
            </div>
          )}
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
