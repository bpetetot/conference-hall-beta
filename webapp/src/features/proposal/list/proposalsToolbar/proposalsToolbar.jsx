import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'components/form/checkbox'
import Button from 'components/button'
import Dropdown from 'components/dropdown'
import IconLabel from 'components/iconLabel'
import { ConfirmationPopin } from 'components/portals'
import { useBulkProposalsStatus, useExportProposals, useSendProposalsEmails } from 'data/proposal'
import { useNotification } from 'app/layout/notification/context'

import styles from './proposalsToolbar.module.css'
import messages from './proposalsToolbar.messages'
import { useSelection } from '../selection-context'

const ProposalToolbar = ({ event, result }) => {
  const { deliberationEnabled } = event
  const { sendError } = useNotification()
  const { allSelected, selectionCount, toggleAll, resetSelection } = useSelection()
  const { mutateAsync: exportJsonProposals, isJsonExporting } = useExportProposals(event.id, 'json')
  const { mutateAsync: exportHtmlProposals, isHtmlExporting } = useExportProposals(event.id, 'html')
  const { mutateAsync: sendProposalsEmails } = useSendProposalsEmails(event.id)
  const { mutateAsync: updateProposals } = useBulkProposalsStatus(event.id)

  const onExportJsonProposals = () =>
    exportJsonProposals().catch((error) => {
      sendError(`An unexpected error has occurred: ${error.message}`)
    })
  const onExportHtmlProposals = () =>
    exportHtmlProposals().catch((error) => {
      sendError(`An unexpected error has occurred: ${error.message}`)
    })
  const onAcceptProposals = () =>
    updateProposals('ACCEPTED', { onSuccess: resetSelection }).catch((error) => {
      sendError(`An unexpected error has occurred: ${error.message}`)
    })
  const onRejectProposals = () =>
    updateProposals('REJECTED', { onSuccess: resetSelection }).catch((error) => {
      sendError(`An unexpected error has occurred: ${error.message}`)
    })
  const onSendEmails = () =>
    sendProposalsEmails().catch((error) => {
      sendError(`An unexpected error has occurred: ${error.message}`)
    })

  return (
    <div className={styles.proposalsActions}>
      <div className={styles.leftActions}>
        <Checkbox
          onChange={toggleAll}
          label={
            !selectionCount
              ? messages('proposals', { count: result.total })
              : `${selectionCount} selected`
          }
          name="all-pages"
          checked={allSelected}
          disabled={result.total === 0}
          indeterminate={selectionCount > 0 && selectionCount !== result.total}
        />
      </div>
      <div className={styles.rightActions}>
        {deliberationEnabled && (
          <>
            <Button tertiary onClick={onAcceptProposals} disabled={selectionCount === 0}>
              <IconLabel icon="fa fa-check" label="Accept" />
            </Button>
            <Button tertiary onClick={onRejectProposals} disabled={selectionCount === 0}>
              <IconLabel icon="fa fa-close" label="Reject" />
            </Button>
            <ConfirmationPopin
              title="Send deliberation emails to speakers"
              content={messages('emails', { count: selectionCount })}
              onOk={onSendEmails}
              withCancel
              renderTrigger={({ show }) => (
                <Button tertiary onClick={show} disabled={selectionCount === 0}>
                  <IconLabel icon="fa fa-rocket" label="Send emails" />
                </Button>
              )}
            />
          </>
        )}
        <Dropdown
          action={
            <Button tertiary disabled={selectionCount === 0}>
              <IconLabel icon="fa fa-caret-down" label="Export..." right />
            </Button>
          }
        >
          <Button
            tertiary
            onClick={onExportJsonProposals}
            loading={isJsonExporting}
            disabled={isJsonExporting || selectionCount === 0}
          >
            <IconLabel icon="fa fa-code" label="JSON export" />
          </Button>
          <Button
            tertiary
            onClick={onExportHtmlProposals}
            loading={isHtmlExporting}
            disabled={isHtmlExporting || selectionCount === 0}
          >
            <IconLabel icon="fa fa-clone" label="Cards export" />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}

ProposalToolbar.propTypes = {
  event: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
}

export default ProposalToolbar
