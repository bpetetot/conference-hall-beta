import { OrganizationMember, OrganizationRole, User } from '@prisma/client'

export class OrganizationMemberDto {
  id: number
  name: string | null
  photoURL: string | null
  role: OrganizationRole

  constructor(
    orgaMember: OrganizationMember & {
      member: User
    },
  ) {
    this.id = orgaMember.memberId
    this.name = orgaMember.member.name
    this.photoURL = orgaMember.member.photoURL
    this.role = orgaMember.role
  }
}
