import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Modal, { withModal } from 'components/modal'
import Markdown from 'components/markdown'

const PREVIEW_MARKDOW_MODAL = 'preview-markdown-modal'

const PreviewMarkdown = ({ openModal, markdown, className }) => (
  <Fragment>
    <a onClick={openModal} role="button" className={cn('preview-markdown-link', className)}>
      preview
    </a>
    <Modal id={PREVIEW_MARKDOW_MODAL} className="preview-markdown-modal">
      <Markdown source={markdown} className="card" />
    </Modal>
  </Fragment>
)

PreviewMarkdown.propTypes = {
  openModal: PropTypes.func.isRequired,
  markdown: PropTypes.string,
  className: PropTypes.string,
}

PreviewMarkdown.defaultProps = {
  markdown: '### Nothing to preview',
  className: undefined,
}

export default withModal(PREVIEW_MARKDOW_MODAL)(PreviewMarkdown)
