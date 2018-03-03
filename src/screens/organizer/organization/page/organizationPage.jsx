import React from 'react'
import PropTypes from 'prop-types'
import Titlebar from 'components/titlebar'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'

const OrganizationPage = ({ name, users, onSelect }) => (
  <div className="organization-page">
    <Titlebar className="organization-header" icon="fa fa-users" title={name} />
    <List
      className="organization-content"
      array={users}
      noResult="No users yet !"
      renderRow={({ id, updateTimestamp }) => (
        <ListItem
          key={id}
          title=""
          subtitle={<RelativeDate date={updateTimestamp} />}
          onSelect={() => onSelect(id)}
        />
      )}
    />
  </div>
)

OrganizationPage.propTypes = {
  name: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func.isRequired,
}

OrganizationPage.defaultProps = {
  users: [],
}

export default OrganizationPage
