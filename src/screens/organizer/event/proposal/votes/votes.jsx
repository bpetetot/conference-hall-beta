import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import Rating from 'components/rating'

const Votes = ({ className }) => (
  <form className={cn(className, 'card')}>
    <div>
      <button className="btn">
        <IconLabel icon="fa fa-angle-left" label="Previous" />
      </button>
    </div>
    <Rating onRate={console.log} />
    <div>
      <button className="btn">
        <IconLabel icon="fa fa-angle-right" label="Next" right />
      </button>
    </div>
  </form>
)

Votes.propTypes = {
  className: PropTypes.string,
}

Votes.defaultProps = {
  className: undefined,
}

export default Votes
