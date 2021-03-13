import { Organization } from '@prisma/client'

export class OrganizationDto {
  id: number
  name: string
  createdAt: Date

  constructor(organization: Organization) {
    this.id = organization.id
    this.name = organization.name
    this.createdAt = organization.createdAt
  }
}
