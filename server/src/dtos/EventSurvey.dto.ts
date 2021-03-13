import { Prisma, Survey } from '@prisma/client'

export class SpeakerSurveyDto {
  answers?: Prisma.JsonValue

  constructor(survey: Survey | null) {
    this.answers = survey?.answers
  }
}
