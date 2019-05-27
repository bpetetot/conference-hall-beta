import React, { useRef, useState, useEffect } from 'react'

import { forRoute } from '@k-redux-router/react-k-ramel'

import Contributors from 'components/contributors'
import IconLabel from 'components/iconLabel'

import Navbar from 'screens/components/navbar'
import Hero from './hero'

import styles from './home.module.css'

const Home = () => {
  const scrollWrapper = useRef(null)

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let request = null
    const wrapper = scrollWrapper.current
    function handleScroll() {
      if (request === null) {
        request = window.requestAnimationFrame(() => {
          if (wrapper.scrollTop >= 300 && !scrolled) {
            setScrolled(true)
          }
          if (wrapper.scrollTop < 300 && scrolled) {
            setScrolled(false)
          }
          request = null
        })
      }
    }
    wrapper.addEventListener('scroll', handleScroll)
    return () => wrapper.removeEventListener('scroll', handleScroll)
  })

  return (
    <div ref={scrollWrapper} className={styles.home}>
      <Navbar fixed transparent={!scrolled} withSearchInput={scrolled} />
      <Hero />
      <div className={styles.highlights}>
        <div className={styles.highlightBlock}>
          <div>
            <i className="fa fa-github fa-4x" />
          </div>
          <h5>Open source</h5>
          <p>Conference Hall is an MIT-licensed open-source project.</p>
        </div>
        <div className={styles.highlightBlock}>
          <div>
            <i className="fa fa-microphone fa-4x" />
          </div>
          <h5>Speaker friendly</h5>
          <p>Write your talk abstract once, and submit it everywhere.</p>
        </div>
        <div className={styles.highlightBlock}>
          <div>
            <i className="fa fa-calendar-check-o fa-4x" />
          </div>
          <h5>Help organizers</h5>
          <p>Speed up and optimize your event or meetup process with Conference Hall.</p>
        </div>
      </div>

      <div className={styles.information}>
        <div className={styles.informationWrapper}>
          <h2>An opened SaaS platform to manage call for papers.</h2>
          <p>
            Conference Hall is an opened SaaS platform to manage call for papers and speakers
            submissions for your conferences and meetups. Speaker writes a talk once and can submit
            it to every events of the platform.
          </p>
          <a
            href="https://github.com/bpetetot/conference-hall"
            target="blank"
            className={styleMedia.btn}
          >
            <IconLabel icon="fa fa-github" label="Contribute to Conference Hall" />
          </a>
        </div>
      </div>

      <div className={styles.features} id="features">
        <h4>Features</h4>
        <div>
          <span role="img" aria-label="Write the abstract">
            ✨Write the abstract of your talk
          </span>
          <span role="img" aria-label="Submit your talks">
            🚀 Submit your talks to events
          </span>
          <span role="img" aria-label="Invite co-speakers">
            🤝 Invite co-speakers to your talk
          </span>
          <span role="img" aria-label="Social login">
            🔒 Social login
          </span>
          <span role="img" aria-label="Create your conference or meetup">
            ❤️ Create your conference or meetup
          </span>
          <span role="img" aria-label="Automatic CFP open/close">
            📣 Automatic CFP open/close
          </span>
          <span role="img" aria-label="Make private events">
            ⚡️ Make private events
          </span>
          <span role="img" aria-label="Manage organization">
            👥 Manage organization
          </span>
          <span role="img" aria-label="Customomize event">
            💡 Customomize event
          </span>
          <span role="img" aria-label="Send survey to speakers">
            📥 Send survey to speakers
          </span>
          <span role="img" aria-label="Rate proposals">
            ⭐️ Rate proposals
          </span>
          <span role="img" aria-label="Discussion between organizers">
            💬 Discussion between organizers
          </span>
          <span role="img" aria-label="Mark proposals as accepted, declined">
            ✅ Mark proposals as accepted, declined...
          </span>
          <span role="img" aria-label="Send emails">
            💌 Send emails
          </span>
          <span role="img" aria-label="Export proposals">
            📃 Export proposals
          </span>
          <span role="img" aria-label="Get speaker confirmations">
            👌 Get speaker confirmations
          </span>
          <span role="img" aria-label="API to query proposals">
            🌍 API to query proposals
          </span>
        </div>
      </div>

      <div className={styles.contributors}>
        <h4>
          Made with{' '}
          <span role="img" aria-label="heart">
            ❤️
          </span>{' '}
          by Contributors
        </h4>
        <p>
          Conference Hall is an MIT-licensed open-source project. Hence, it grows thanks to all the
          contributors. Feel free to contribute!
        </p>
        <Contributors className={styles.contributorsList} />
      </div>

      <footer className={styles.footer}>
        <p>
          <a
            href="https://github/bpetetot/conference-hall"
            target="blank"
          >
            <i className="fa fa-github fa-2x" />
          </a><br />
          Released under the MIT License <br />
          Copyright © 2018-2019 by&nbsp;
          <a href="https://twitter.com/bpetetot" target="blank">
            Benjamin Petetot
          </a>
        </p>
      </footer>
    </div>
  )
}

export default forRoute.absolute('home')(Home)
