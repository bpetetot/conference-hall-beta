import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'
import Markdown from 'components/markdown'
import './abstract.css'

const TalkAbstract = ({ abstract, references, languages, level, className }) => (
  <div className={cn('talk-abstract card', className)}>
    <div className="talk-abstract-title">
      <h3>Abstract</h3>
      <div className="talk-abstract-more-info">
        <Badge outline pill light>
          {level}
        </Badge>
        <Badge outline pill light>
          {languages && languages[0]}
        </Badge>
      </div>
    </div>
    <Markdown source={abstract} />
    <h3 className="talk-reference">References</h3>
    <Markdown source={references} />
  </div>
)

TalkAbstract.propTypes = {
  abstract: PropTypes.string,
  references: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
  level: PropTypes.string,
  className: PropTypes.string,
}

TalkAbstract.defaultProps = {
  abstract: undefined,
  references: undefined,
  languages: [],
  level: 'not defined',
  className: undefined,
}

export default TalkAbstract
