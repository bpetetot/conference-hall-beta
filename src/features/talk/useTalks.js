import firebase from 'firebase/app'
import functions from 'firebase/functionCalls'
import { useMutation, useQuery, useQueryCache } from 'react-query'

import { useAuth } from 'features/auth'
import talksCrud, { fetchUserTalks } from 'firebase/talks'
import { FILTERS } from 'models/Talk'
import { useParams } from 'react-router-dom'

export const useTalks = () => {
  const { user } = useAuth()
  return useQuery(['talks', user?.uid], async (key, userId) => {
    if (!userId) return {}
    return fetchUserTalks(userId)
  })
}

export const useFilteredTalks = (status) => {
  const result = useTalks()
  const filteredTalks = result.data?.filter((talk) => {
    if (status === FILTERS.ALL) return true
    if (status === FILTERS.ARCHIVED) return talk.archived === true
    return talk.archived !== true
  })
  return { ...result, data: filteredTalks }
}

export const useTalk = (talkId) => {
  const { talkId: routeId } = useParams()
  return useQuery(['talk', talkId || routeId], async (key, id) => {
    if (!id) return null
    const result = await talksCrud.read(id)
    return result.data()
  })
}

export const useSaveTalk = (talkId) => {
  const { user } = useAuth()
  const cache = useQueryCache()
  return useMutation(
    (data) => {
      if (talkId) {
        return talksCrud.update({ id: talkId, ...data })
      }
      return talksCrud.create({
        ...data,
        archived: false,
        speakers: { [user.uid]: true },
        owner: user.uid,
      })
    },
    {
      onSuccess: () => {
        cache.invalidateQueries(['talks'])
        cache.invalidateQueries(['talk', talkId])
      },
    },
  )
}

export const useAddSpeaker = (talkId) => {
  const [saveTalk] = useSaveTalk(talkId)
  return (uid) => saveTalk({ [`speakers.${uid}`]: true })
}

export const useRemoveSpeaker = (talkId) => {
  const [saveTalk] = useSaveTalk(talkId)
  return (uid) => saveTalk({ [`speakers.${uid}`]: firebase.firestore.FieldValue.delete() })
}

export const useDeleteTalk = (talkId) => {
  const cache = useQueryCache()
  return useMutation(
    async () => {
      if (!talkId) return
      await talksCrud.delete(talkId)
    },
    {
      onSuccess: () => {
        cache.invalidateQueries(['talks'])
        cache.removeQueries(['talk', talkId])
      },
    },
  )
}

export const useSubmitTalk = (talkId, eventId, callback) => {
  const cache = useQueryCache()
  const { data: talk } = useTalk(talkId)
  return useMutation((data) => functions.submitTalk({ eventId, talk: { ...data, ...talk } }), {
    onSuccess: () => {
      cache.invalidateQueries(['talks'])
      cache.invalidateQueries(['talk', talkId])
      callback()
    },
  })
}

export const useUnsubmitTalk = (talkId, eventId, callback) => {
  const cache = useQueryCache()
  const { data: talk } = useTalk(talkId)
  return useMutation(() => functions.unsubmitTalk({ eventId, talk }), {
    onSuccess: () => {
      cache.invalidateQueries(['talks'])
      cache.invalidateQueries(['talk', talkId])
      callback()
    },
  })
}
