import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'
import { List, ListItem } from 'components/list'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import RelativeDate from 'components/relativeDate'
import NoTalks from 'screens/speaker/components/noTalks'

const MyTalks = ({ talks, onSelect }) => (
  <div className="talks-page">
    <Titlebar icon="fa fa-microphone" title="My talks">
      <Link href="/speaker/talk/create" className="btn">
        <IconLabel icon="fa fa-calendar-plus-o" label="Create talk" />
      </Link>
    </Titlebar>
    <List
      array={talks}
      noResult={<NoTalks />}
      renderRow={({ id, title, updateTimestamp }) => (
        <ListItem
          key={id}
          title={title}
          subtitle={<RelativeDate date={updateTimestamp} />}
          onSelect={() => onSelect(id)}
        />
      )}
    />
  </div>
)

MyTalks.propTypes = {
  talks: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func.isRequired,
}

MyTalks.defaultProps = {
  talks: [],
}

export default MyTalks
