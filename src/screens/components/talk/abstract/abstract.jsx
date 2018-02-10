import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Markdown from 'components/markdown'

const TalkAbstract = ({ abstract, references, className }) => (
  <div className={cn('card', className)}>
    <h3>Abstract</h3>
    <Markdown source={abstract} />
    <h3>References</h3>
    <Markdown source={references} />
  </div>
)

TalkAbstract.propTypes = {
  abstract: PropTypes.string,
  references: PropTypes.string,
  className: PropTypes.string,
}

TalkAbstract.defaultProps = {
  abstract: undefined,
  references: undefined,
  className: undefined,
}

export default TalkAbstract
