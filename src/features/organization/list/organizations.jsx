import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Titlebar from 'components/titlebar'
import { Link, useNavigate } from 'react-router-dom'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'

import { toDate } from 'helpers/firebase'

function MyOrganizations({ organizations }) {
  const navigate = useNavigate()
  const handleSelect = useCallback(
    (organizationId) => {
      navigate(`/organizer/organization/${organizationId}`)
    },
    [navigate],
  )

  return (
    <div className="organizations-page">
      <Titlebar className="organizations-header" icon="fa fa-users" title="My organizations">
        <Button>
          {(btn) => (
            <Link to="/organizer/organization/create" className={btn}>
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
            subtitle={<RelativeDate date={toDate(updateTimestamp)} />}
            onSelect={() => handleSelect(id)}
          />
        )}
      />
    </div>
  )
}

MyOrganizations.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.object),
}

MyOrganizations.defaultProps = {
  organizations: [],
}

export default MyOrganizations
