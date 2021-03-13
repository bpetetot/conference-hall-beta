import { Prisma, Survey } from '@prisma/client'

export class OrganizerSpeakerSurveyDto {
  answers?: Prisma.JsonValue

  constructor(survey: Survey | null) {
    this.answers = survey?.answers
  }
}
