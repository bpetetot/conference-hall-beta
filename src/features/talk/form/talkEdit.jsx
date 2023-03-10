import React, { useCallback } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'
import talkCrud from 'firebase/talks'

import TalkForm from './talkForm'

function TalkEdit({ talkId, updateCache, ...rest }) {
  const navigate = useNavigate()

  const onSubmit = useCallback(
    async (data) => {
      await talkCrud.update(data)
      updateCache(data)
      navigate(`/speaker/talk/${talkId}`)
    },
    [navigate, updateCache, talkId],
  )

  return <TalkForm {...rest} onSubmit={onSubmit} />
}

const mapStore = (store, { talkId }) => {
  const talk = store.data.talks.get(talkId)
  return {
    loaded: !!talk,
    initialValues: talk,
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_TALK', payload: { talkId } }),
    updateCache: (data) => store.data.talks.update(data),
  }
}

TalkEdit.propTypes = {
  talkId: PropTypes.string.isRequired,
  updateCache: PropTypes.func.isRequired,
}

export default compose(inject(mapStore), loader)(TalkEdit)
