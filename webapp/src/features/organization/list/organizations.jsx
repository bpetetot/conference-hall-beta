import React from 'react'
import Titlebar from 'components/titlebar'
import { Link, useNavigate } from 'react-router-dom'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'
import LoadingIndicator from 'components/loader'

import { useOrganizations } from '../../../data/organization'

const MyOrganizations = () => {
  const navigate = useNavigate()

  const { data: organizations, isLoading, isSuccess, isError, error } = useOrganizations()

  const handleSelect = (id) => navigate(`/organizer/organization/${id}`)

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
      {isLoading && <LoadingIndicator />}
      {isError && <div>An unexpected error has occurred: {error.message}</div>}
      {isSuccess && (
        <List
          className="organizations-content"
          array={organizations}
          noResult="No organization yet !"
          renderRow={({ id, name, createdAt }) => (
            <ListItem
              key={id}
              title={name}
              subtitle={<RelativeDate date={createdAt} />}
              onSelect={() => handleSelect(id)}
            />
          )}
        />
      )}
    </div>
  )
}

export default MyOrganizations
