import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Checkbox from 'components/form/checkbox'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Dropdown from 'components/dropdown'

import { ConfirmationPopin } from 'components/portals'
import styles from './proposalsToolbar.module.css'
import messages from './proposalsToolbar.messages'

const ProposalToolbar = ({
  onSelectAll,
  onExportProposals,
  onAcceptProposals,
  onRejectProposals,
  onSendEmails,
  deliberationActive,
  exporting,
  nbSelected,
  totalProposals,
  nbRejectedEmails,
  nbAcceptedEmails,
}) => (
  <div className={cn(styles.proposalsActions, 'no-print')}>
    <div className={styles.leftActions}>
      <Checkbox
        onChange={onSelectAll}
        label={
          !nbSelected ? messages('proposals', { count: totalProposals }) : `${nbSelected} selected`
        }
        name="all-pages"
        value={!!nbSelected}
        disabled={!deliberationActive || totalProposals === 0}
        indeterminate={nbSelected !== totalProposals}
      />
    </div>
    <div className={styles.rightActions}>
      {nbSelected === 0 && totalProposals > 0 && (
        <Dropdown
          action={(
            <Button tertiary loading={!!exporting}>
              <IconLabel icon="fa fa-caret-down" label="Export..." right />
            </Button>
)}
        >
          <Button onClick={onExportProposals('json')} disabled={!!exporting}>
            <IconLabel icon="fa fa-cloud-download" label="JSON file" />
          </Button>
          <Button onClick={onExportProposals('pdf')} disabled={!!exporting}>
            <IconLabel icon="fa fa-file-pdf-o" label="PDF cards" />
          </Button>
        </Dropdown>
      )}
      {deliberationActive && nbSelected > 0 && (
        <>
          <Button tertiary onClick={onAcceptProposals} disabled={nbSelected === 0}>
            <IconLabel icon="fa fa-check" label="Accept proposals" />
          </Button>
          <Button tertiary onClick={onRejectProposals} disabled={nbSelected === 0}>
            <IconLabel icon="fa fa-close" label="Reject proposals" />
          </Button>
          <ConfirmationPopin
            title="Send deliberation emails to speakers"
            content={`You are going to send ${messages('emails', {
              count: nbAcceptedEmails,
              type: 'acceptation',
            })} and ${messages('emails', {
              count: nbRejectedEmails,
              type: 'rejection',
            })}. Continue?`}
            onOk={onSendEmails}
            withCancel
            renderTrigger={({ show }) => (
              <Button tertiary onClick={show} disabled={nbSelected === 0}>
                <IconLabel icon="fa fa-rocket" label="Send emails" />
              </Button>
            )}
          />
        </>
      )}
    </div>
  </div>
)

ProposalToolbar.propTypes = {
  onSelectAll: PropTypes.func.isRequired,
  onAcceptProposals: PropTypes.func.isRequired,
  onRejectProposals: PropTypes.func.isRequired,
  onExportProposals: PropTypes.func.isRequired,
  onSendEmails: PropTypes.func.isRequired,
  deliberationActive: PropTypes.bool,
  exporting: PropTypes.string,
  nbSelected: PropTypes.number,
  totalProposals: PropTypes.number,
  nbRejectedEmails: PropTypes.number,
  nbAcceptedEmails: PropTypes.number,
}

ProposalToolbar.defaultProps = {
  deliberationActive: false,
  exporting: null,
  nbSelected: 0,
  totalProposals: 0,
  nbRejectedEmails: 0,
  nbAcceptedEmails: 0,
}

export default ProposalToolbar
