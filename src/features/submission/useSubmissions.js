/* eslint-disable import/prefer-default-export */
import { useSaveTalk, useTalks } from 'features/talk/useTalks'

export const useEventSubmissions = (eventId) => {
  const result = useTalks()

  const submissions = result.data
    ?.filter((talk) => !!talk?.submissions?.[eventId])
    ?.map((talk) => talk.submissions[eventId])

  return { ...result, data: submissions }
}

export const useSubmission = (talkId, eventId) => {
  const result = useTalks()
  const talk = result.data?.find((t) => t.id === talkId)
  const submission = talk?.submissions?.[eventId]
  return { ...result, data: submission }
}

export const useUpdateSubmissionState = (talkId, eventId, state) => {
  const [saveTalk] = useSaveTalk(talkId)
  return () => saveTalk({ [`submissions.${eventId}.state`]: state })
}
