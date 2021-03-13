import { Organization, OrganizationRole, Prisma, User } from '@prisma/client'
import { prisma } from '../../src/db/db'

export async function buildOrganization(organization?: Partial<Prisma.OrganizationCreateInput>) {
  const data: Prisma.OrganizationCreateInput = {
    name: 'name',
    ...(organization || {}),
  }

  return prisma.organization.create({ data })
}

export async function buildOrganizationMember(
  user: User,
  organization: Organization,
  role: OrganizationRole = 'OWNER',
) {
  return prisma.organizationMember.create({
    data: {
      memberId: user.id,
      organizationId: organization.id,
      role,
    },
  })
}
