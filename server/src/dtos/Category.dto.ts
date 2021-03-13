import { EventCategory } from '@prisma/client'

export class CategoryDto {
  id: number
  name: string
  description?: string | null

  constructor(category: EventCategory) {
    this.id = category.id
    this.name = category.name
    this.description = category.description
  }
}
