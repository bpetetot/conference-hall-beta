import { EventFormat } from '@prisma/client'

export class FormatDto {
  id: number
  name: string
  description?: string | null

  constructor(format: EventFormat) {
    this.id = format.id
    this.name = format.name
    this.description = format.description
  }
}
