/* eslint-disable import/prefer-default-export */
import { useTalks } from 'features/talk/useTalks'

export const useEventSubmissions = (eventId) => {
  const result = useTalks()

  const submissions = result.data
    ?.filter((talk) => !!talk?.submissions?.[eventId])
    ?.map((talk) => talk.submissions[eventId])

  return { ...result, data: submissions }
}
