/* eslint-disable import/prefer-default-export */
import { useSaveTalk, useTalks } from 'features/talk/useTalks'

export const useEventSubmissions = (eventId) => {
  const result = useTalks()

  const submissions = result.data?.filter((talk) => talk.isSubmitted(eventId))

  return { ...result, data: submissions }
}

export const useUpdateSubmissionState = (talkId, eventId, state) => {
  const [saveTalk] = useSaveTalk(talkId)
  return () => saveTalk({ [`submissions.${eventId}.state`]: state })
}
