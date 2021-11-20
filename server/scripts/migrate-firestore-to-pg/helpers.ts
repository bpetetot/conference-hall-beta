import { TalkLevel } from '@prisma/client'
import { firestore } from 'firebase-admin'

export function timestampToDate(timestamp: any) {
  if (timestamp instanceof firestore.Timestamp) {
    return timestamp?.toDate() ?? new Date()
  }
  return undefined
}

export function mapLevels(level?: string) {
  switch (level) {
    case 'beginner':
      return TalkLevel.BEGINNER
    case 'intermediate':
      return TalkLevel.INTERMEDIATE
    case 'advanced':
      return TalkLevel.ADVANCED
    default:
      return undefined
  }
}
