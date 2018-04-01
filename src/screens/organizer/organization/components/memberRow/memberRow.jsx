import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import RelativeDate from 'components/relativeDate'
import { ListItem } from 'components/list'
import AvatarLabel from 'components/avatar/avatarLabel'

const MemberRow = ({
  id, displayName, photoURL, updateTimestamp, owner,
}) => (
  <ListItem
    key={id}
    title={(
      <AvatarLabel displayName={displayName} photoURL={photoURL} />
    )}
    subtitle={<RelativeDate date={updateTimestamp} />}
    renderActions={() => owner === id || (
      <a role="button" className="btn btn-default">
        <IconLabel icon="fa fa-trash" label="Remove from organization" />
      </a>
    )}
  />
)

MemberRow.propTypes = {
  id: PropTypes.number.isRequired,
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  updateTimestamp: PropTypes.string.isRequired,
  owner: PropTypes.number.isRequired,
}

export default MemberRow
