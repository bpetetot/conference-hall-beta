import React from 'react'
import PropTypes from 'prop-types'
import Titlebar from 'components/titlebar'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'

const MyOrganizations = ({ organizations, onSelect }) => (
  <div className="organizations-page">
    <Titlebar className="organizations-header" icon="fa fa-users" title="My organizations">
      <Button>
        {btn => (
          <Link href="/organizer/organization/create" className={btn}>
            <IconLabel icon="fa fa-users" label="Create organization" />
          </Link>
        )}
      </Button>
    </Titlebar>
    <List
      className="organizations-content"
      array={organizations}
      noResult="No organization yet !"
      renderRow={({ id, name, updateTimestamp }) => (
        <ListItem
          key={id}
          title={name}
          subtitle={<RelativeDate date={updateTimestamp} />}
          onSelect={() => onSelect(id)}
        />
      )}
    />
  </div>
)

MyOrganizations.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func.isRequired,
}

MyOrganizations.defaultProps = {
  organizations: [],
}

export default MyOrganizations
