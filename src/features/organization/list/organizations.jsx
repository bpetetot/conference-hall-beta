import React from 'react'
import Titlebar from 'components/titlebar'
import { Link, useNavigate } from 'react-router-dom'

import { LoadingIndicator } from 'components/loader'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'

import { toDate } from 'helpers/firebase'
import { useOrganizations } from '../useOrganizations'

const OrganizationsList = () => {
  const navigate = useNavigate()

  const { data, isLoading } = useOrganizations()

  if (isLoading) return <LoadingIndicator />

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
        array={data}
        noResult="No organization yet !"
        renderRow={({ id, name, updateTimestamp }) => (
          <ListItem
            key={id}
            title={name}
            subtitle={<RelativeDate date={toDate(updateTimestamp)} />}
            onSelect={() => navigate(`/organizer/organization/${id}`)}
          />
        )}
      />
    </div>
  )
}

export default OrganizationsList
