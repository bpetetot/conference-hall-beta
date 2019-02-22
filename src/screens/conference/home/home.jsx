import React from 'react'
import { Link, forRoute } from '@k-redux-router/react-k-ramel'

import './home.css'

const Home = () => (
  <div className="home">
    <header className="header">
      <div className="header-bar">
        <div className="logo">
          <i className="fa fa-paper-plane fa-3x" />
          &nbsp;
          <span className="title">
            Conference <span className="title-2">Hall</span>
          </span>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <Link code="organizer">SPEAKER</Link>
            </li>
            <li>
              <Link code="organizer">ORGANIZER</Link>
            </li>
            <li>
              <a href="#features">FEATURES</a>
            </li>
            <li>
              <a href="#screenshots">SCREENSHOTS</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="search">
        <h4>
          Find events and meetups all around the world to submit your talks, quickies and
          workshops...
        </h4>
        <input type="search" placeholder="Search an event to submit..." />
      </div>
    </header>

    <div className="highlights">
      <div className="highlight-block">
        <div className="icon-wrapper">
          <i className="fa fa-github fa-4x" />
        </div>
        <h5>Open source</h5>
        <p>
          Documentis per Lycaoniam milite campestrem idem omnia per magna magnis timore nostris
          propinqua igitur se.
        </p>
      </div>
      <div className="highlight-block">
        <div className="icon-wrapper">
          <i className="fa fa-microphone fa-4x" />
        </div>
        <h5>Speaker friendly</h5>
        <p>
          Inopia et ordinarias praefectus causam convectio ordinarias praetorio ad Rufinus ea quam
          sit alioqui ipse.
        </p>
      </div>
      <div className="highlight-block">
        <div className="icon-wrapper">
          <i className="fa fa-calendar-check-o fa-4x" />
        </div>
        <h5>Help organizers</h5>
        <p>
          Latrones re nulla equitum undique fama distinebatur dispersique periculo avia nulla
          equitum quo militaribus quoniam.
        </p>
      </div>
    </div>

    <div className="information" id="information">
      <div className="information-wrapper">
        <h2>An opened SaaS platform to manage call for papers.</h2>
        <p>
          Quae dum ita struuntur, indicatum est apud Tyrum indumentum regale textum occulte,
          incertum quo locante vel cuius usibus apparatum. ideoque rector provinciae tunc pater
          Apollinaris eiusdem nominis ut conscius ductus est aliique congregati sunt ex diversis
          civitatibus multi, qui atrocium criminum ponderibus urgebantur.
        </p>
        <a
          href="https://github/bpetetot/conference-hall"
          target="blank"
          className="btn btn-secondary d-inline-block"
        >
          Learn more about Conference Hall
        </a>
      </div>
    </div>

    <div className="features" id="features">
      <h4>Features</h4>
      <p>
        Et Epigonus quidem amictu tenus philosophus, ut apparuit, prece frustra temptata, sulcatis
        lateribus mortisque metu admoto turpi confessione cogitatorum socium, quae nulla erant,
        fuisse firmavit cum nec vidisset quicquam nec audisset penitus expers forensium rerum;
        Eusebius vero obiecta fidentius negans, suspensus in eodem gradu constantiae stetit
        latrocinium illud esse, non iudicium clamans.
      </p>
    </div>

    <div className="screenshots" id="screenshots">
      <h4>Screenshots</h4>
      <p>
        Metuentes igitur idem latrones Lycaoniam magna parte campestrem cum se inpares nostris fore
        congressione stataria documentis frequentibus scirent, tramitibus deviis petivere Pamphyliam
        diu quidem intactam sed timore populationum et caedium, milite per omnia diffuso propinqua,
        magnis undique praesidiis conmunitam.
      </p>
    </div>

    <div className="contributors" id="contributors">
      <h4>Contributors</h4>
      <p>
        Conference Hall is an MIT-licensed open-source project. Hence, it grows thanks to all the
        contributors. Feel free to contribute!
      </p>
      <div className="support-section">Benjamin</div>
    </div>

    <footer className="footer">
      <p>
        Released under the MIT License <br />
        Copyright © 2018-2019 by&nbsp;
        <a href="https://twitter.com/bpetetot" target="blank">
          Benjamin Petetot
        </a>
      </p>
    </footer>
  </div>
)

export default forRoute.absolute('home')(Home)
