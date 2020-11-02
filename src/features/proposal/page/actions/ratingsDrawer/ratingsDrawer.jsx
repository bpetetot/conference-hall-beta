import React from 'react'
import PropTypes from 'prop-types'

import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel/iconLabel'
import RatingsBlock from 'features/ratings/ratings-block'

const RatingsDrawer = ({ eventId, proposalId, total, loves, hates, noopinion }) => (
  <Drawer
    title="Team ratings"
    renderTrigger={({ show }) => (
      <Button secondary onClick={show}>
        <IconLabel icon="fa fa-star" label="All ratings" />
      </Button>
    )}
  >
    <RatingsBlock
      eventId={eventId}
      proposalId={proposalId}
      total={total}
      loves={loves}
      hates={hates}
      noopinion={noopinion}
    />
  </Drawer>
)

RatingsDrawer.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposalId: PropTypes.string.isRequired,
  total: PropTypes.number,
  loves: PropTypes.number,
  hates: PropTypes.number,
  noopinion: PropTypes.number,
}

RatingsDrawer.defaultProps = {
  total: 0,
  loves: 0,
  hates: 0,
  noopinion: 0,
}

export default RatingsDrawer
