/* eslint-disable class-methods-use-this */

import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'

import './inline.css'

class Inline extends React.Component {
  join = (children) =>
    children.reduce((result, child, index) => {
      if (!child) return result
      if (index === 0 || isEmpty(result)) return [this.renderItem(child, index)]
      return [...result, this.renderSeparator(`${index}-separator`), this.renderItem(child, index)]
    }, [])

  renderItem = (item, key) => (
    <span key={key} className={this.props.classNameItem}>
      {item}
    </span>
  )

  renderSeparator = (key) => (
    <span key={key} className="inline-items-separator">
      •
    </span>
  )

  render() {
    return (
      <div className={cn('inline-items', this.props.className)}>
        {this.join(this.props.children)}
      </div>
    )
  }
}

Inline.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  className: PropTypes.string,
  classNameItem: PropTypes.string,
}

Inline.defaultProps = {
  children: undefined,
  className: undefined,
  classNameItem: undefined,
}

export default Inline
