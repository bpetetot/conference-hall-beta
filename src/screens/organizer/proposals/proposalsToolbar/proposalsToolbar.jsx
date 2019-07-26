import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'

import Checkbox from 'components/form/checkbox'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Dropdown from 'components/dropdown'

import styles from './proposalsToolbar.module.css'

class ProposalToolbar extends Component {
  state = {
    checkAll: this.props.selection.length,
  }

  handleSelect = () => {
    this.setState(
      state => ({ checkAll: !state.checkAll }),
      () => this.props.onSelectAll(this.state.checkAll),
    )
  }

  render() {
    const {
      onSendEmails,
      onExportProposals,
      onAcceptProposals,
      onRejectProposals,
      selection,
      deliberationActive,
      exporting,
      nbSelected,
      totalProposals,
    } = this.props

    const { checkAll } = this.state

    return (
      <div className={cn(styles.proposalsActions, 'no-print')}>
        <div className={styles.leftActions}>
          <Checkbox
            onClick={this.handleSelect}
            label={!nbSelected ? `${totalProposals} proposals` : `${nbSelected} selected`}
            name="all-pages"
            value={checkAll}
          />
        </div>
        <div className={styles.rightActions}>
          {nbSelected === 0 && (
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
            <Fragment>
              <Button
                tertiary
                onClick={() => onAcceptProposals(selection)}
                disabled={isEmpty(selection)}
              >
                <IconLabel icon="fa fa-check" label="Accept proposals" />
              </Button>
              <Button
                tertiary
                onClick={() => onRejectProposals(selection)}
                disabled={isEmpty(selection)}
              >
                <IconLabel icon="fa fa-close" label="Reject proposals" />
              </Button>
              <Button
                tertiary
                onClick={() => onSendEmails(selection)}
                disabled={isEmpty(selection)}
              >
                <IconLabel icon="fa fa-rocket" label="Send emails" />
              </Button>
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

ProposalToolbar.propTypes = {
  selection: PropTypes.arrayOf(PropTypes.string),
  onSendEmails: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onAcceptProposals: PropTypes.func.isRequired,
  onRejectProposals: PropTypes.func.isRequired,
  onExportProposals: PropTypes.func.isRequired,
  deliberationActive: PropTypes.bool,
  exporting: PropTypes.string,
  nbSelected: PropTypes.number,
  totalProposals: PropTypes.number,
}

ProposalToolbar.defaultProps = {
  selection: [],
  deliberationActive: false,
  exporting: null,
  nbSelected: 0,
  totalProposals: 0,
}

export default ProposalToolbar
