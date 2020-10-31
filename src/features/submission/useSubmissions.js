/* eslint-disable import/prefer-default-export */
import { useSaveTalk, useTalks } from 'features/talk/useTalks'

export const useEventSubmissions = (eventId) => {
  const result = useTalks()

  const submissions = result.data
    ?.filter((talk) => talk.isSubmitted(eventId))
    ?.map((talk) => talk.getSubmission(eventId))

  return { ...result, data: submissions }
}

export const useSubmission = (talkId, eventId) => {
  const result = useTalks()
  const talk = result.data?.find((t) => t.id === talkId)
  return { ...result, data: talk.getSubmission(eventId) }
}

export const useUpdateSubmissionState = (talkId, eventId, state) => {
  const [saveTalk] = useSaveTalk(talkId)
  return () => saveTalk({ [`submissions.${eventId}.state`]: state })
}
