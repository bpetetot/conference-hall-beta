import { OrganizationMember, User } from '@prisma/client'
import { UserOrganizationRoleDto } from './UserOrganizationRole.dto'

export class UserMeDto {
  id: number
  uid: string
  email?: string | null
  name?: string | null
  bio?: string | null
  photoURL?: string | null
  betaAccess?: string | null
  github?: string | null
  company?: string | null
  language?: string | null
  references?: string | null
  twitter?: string | null
  address?: string | null
  lat?: number | null
  lng?: number | null
  timezone?: string | null
  organizations: UserOrganizationRoleDto[]

  constructor(
    user: User & {
      organizations: OrganizationMember[]
    },
  ) {
    this.id = user.id
    this.uid = user.uid
    this.email = user.email
    this.name = user.name
    this.bio = user.bio
    this.photoURL = user.photoURL
    this.betaAccess = user.betaAccess
    this.github = user.github
    this.company = user.company
    this.language = user.language
    this.references = user.references
    this.twitter = user.twitter
    this.address = user.address
    this.lat = user.lat
    this.lng = user.lng
    this.timezone = user.timezone
    this.organizations = user.organizations.map((member) => new UserOrganizationRoleDto(member))
  }
}
