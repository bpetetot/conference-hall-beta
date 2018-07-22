import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import Titlebar from 'components/titlebar'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import ProposalFilters from './proposalFilters'
import ProposalsList from './proposalsList'
import ProposalsCards from './proposalsCards'

const Proposals = ({ eventId, nbProposals, route }) => {
  const title = nbProposals > 0 ? `Proposals (${nbProposals})` : 'Proposals'
  return (
    <div>
      <Titlebar icon="fa fa-paper-plane" title={title} className="no-print">
        <Button tertiary>
          {btn => (route === 'PROPOSALS' ? (
            <Link href={`/organizer/event/${eventId}/proposals/cards`} className={btn}>
              <IconLabel icon="fa fa-th" label="Cards" />
            </Link>
          ) : (
            <Link href={`/organizer/event/${eventId}/proposals`} className={btn}>
              <IconLabel icon="fa fa-th-list" label="List" />
            </Link>
          ))
          }
        </Button>
      </Titlebar>
      <ProposalFilters eventId={eventId} />
      <ProposalsList eventId={eventId} />
      <ProposalsCards eventId={eventId} />
    </div>
  )
}

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  nbProposals: PropTypes.number.isRequired,
}

export default Proposals
