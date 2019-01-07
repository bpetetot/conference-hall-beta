import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import SubmitTalkLink from 'screens/components/submitTalksLink'
import { List, ListItem } from 'components/list'

const Submissions = ({ eventId, talks, onSelect }) => (
  <div>
    <Titlebar icon="fa fa-inbox" title="My submissions">
      <SubmitTalkLink eventId={eventId} />
    </Titlebar>
    <div>
      <List
        array={talks}
        noResult={<div>No submissions</div>}
        renderRow={({ id, title, state }) => (
          <ListItem
            key={id}
            title={title}
            info={<div>{state}</div>}
            onSelect={() => onSelect(id)}
          />
        )}
      />
    </div>
  </div>
)

Submissions.propTypes = {
  eventId: PropTypes.string.isRequired,
  talks: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
}

Submissions.defaultProps = {
  talks: [],
}

export default Submissions
