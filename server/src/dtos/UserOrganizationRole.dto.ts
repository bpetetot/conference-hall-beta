import { OrganizationMember, OrganizationRole } from '@prisma/client'

export class UserOrganizationRoleDto {
  organizationId: number
  role: OrganizationRole

  constructor(member: OrganizationMember) {
    this.organizationId = member.organizationId
    this.role = member.role
  }
}
