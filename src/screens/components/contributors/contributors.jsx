import React, { Component } from 'react'
import forRoute from 'hoc-little-router'

import IconLabel from 'components/iconLabel'
import Contributor from './contributor'

import './contributors.css'

class Contributors extends Component {
  state = {
    contributors: [],
  }

  async componentWillMount() {
    const response = await fetch('https://api.github.com/repos/bpetetot/conference-hall/contributors')
    const contributors = await response.json()
    this.setState({ contributors })
  }

  render() {
    const { contributors } = this.state
    const count = contributors.length > 0 ? contributors.length : 'all'
    return (
      <div>
        <h1>
          <IconLabel icon="fa fa-github-alt" label={`Thanks to our ${count} contributors!`} />
        </h1>
        <div className="contributors-list">
          {contributors.map(c => (
            <Contributor key={c.id} name={c.login} image={c.avatar_url} url={c.html_url} />
          ))}
        </div>
        <small className="contributors-message">
          If you want to contribute, feel free to{' '}
          <a href="https://github.com/bpetetot/conference-hall" target="_blank" rel="noopener noreferrer">
            check it out
          </a>{' '}
          ;)
        </small>
      </div>
    )
  }
}

export default forRoute.absolute('CONTRIBUTORS')(Contributors)
