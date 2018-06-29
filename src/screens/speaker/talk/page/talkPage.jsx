import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { TalkAbstract, TalkSpeakers, TalkSubmissions } from 'screens/components/talk'
import DeleteTalkButton from './delete'

import './talkPage.css'

const TalkPage = ({
  id, title, abstract, level, owner, references, speakers, submissions,
}) => (
  <div>
    <Titlebar icon="fa fa-microphone" title={title}>
      <DeleteTalkButton talkId={id} />
      <Button secondary small>
        {btn => (
          <Link href={`/speaker/talk/${id}/edit`} className={btn}>
            <IconLabel icon="fa fa-pencil" label="Edit" />
          </Link>
        )}
      </Button>
      <Button accent>
        {btn => (
          <Link href={`/speaker/talk/${id}/submission`} className={btn}>
            <IconLabel icon="fa fa-paper-plane" label="Submit" />
          </Link>
        )}
      </Button>
    </Titlebar>
    <div className="talk-page">
      <TalkAbstract
        className="talk-content"
        abstract={abstract}
        references={references}
        level={level}
      />
      <div className="talk-info">
        <TalkSpeakers speakers={speakers} owner={owner} edit />
        <TalkSubmissions id={id} submissions={submissions} />
      </div>
    </div>
  </div>
)

TalkPage.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string,
  level: PropTypes.string,
  owner: PropTypes.string,
  references: PropTypes.string,
  speakers: PropTypes.objectOf(PropTypes.bool),
  submissions: PropTypes.objectOf(PropTypes.any),
}

TalkPage.defaultProps = {
  abstract: undefined,
  level: 'not defined',
  owner: undefined,
  references: undefined,
  speakers: {},
  submissions: {},
}

export default TalkPage
