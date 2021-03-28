import { OrganizationRole, Prisma } from '@prisma/client'
import { prisma } from './db'

type GetOrganizationOptions = {
  withMembers?: boolean
}

export function getOrganizationById(organizationId: number, options?: GetOrganizationOptions) {
  return prisma.organization.findUnique({
    where: { id: organizationId },
    include: {
      members: options?.withMembers || false,
    },
  })
}

export async function getOrganizationForUserRole(
  organizationId: number,
  userId: number,
  roles?: OrganizationRole[],
) {
  return prisma.organization.findFirst({
    where: {
      id: organizationId,
      members: {
        some: {
          memberId: userId,
          role: {
            in: roles || [
              OrganizationRole.OWNER,
              OrganizationRole.REVIEWER,
              OrganizationRole.MEMBER,
            ],
          },
        },
      },
    },
  })
}

export function findOrganizationsByUser(userId: number) {
  return prisma.organization.findMany({
    where: {
      members: {
        some: {
          memberId: userId,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
}

type OrganizationCreateInput = Prisma.OrganizationCreateInput

export function createOrganization(userId: number, data: OrganizationCreateInput) {
  return prisma.organization.create({
    data: {
      ...data,
      members: {
        create: {
          memberId: userId,
          role: OrganizationRole.OWNER,
        },
      },
    },
  })
}

type OrganizationUpdateInput = Prisma.OrganizationUpdateInput

export function updateOrganization(organizationId: number, data: OrganizationUpdateInput) {
  return prisma.organization.update({
    data,
    where: { id: organizationId },
  })
}

export function findOrganizationMembers(organizationId: number) {
  return prisma.organizationMember.findMany({
    where: { organizationId },
    include: { member: true },
    orderBy: { member: { name: 'asc' } },
  })
}

export function addMember(organizationId: number, memberId: number) {
  return prisma.organizationMember.create({
    data: {
      organizationId,
      memberId,
      role: OrganizationRole.REVIEWER,
    },
    include: { member: true },
  })
}

export function updateMemberRole(organizationId: number, memberId: number, role: OrganizationRole) {
  return prisma.organizationMember.update({
    data: { role },
    where: { memberId_organizationId: { memberId, organizationId } },
  })
}

export function deleteMember(organizationId: number, memberId: number) {
  return prisma.organizationMember.delete({
    where: { memberId_organizationId: { memberId, organizationId } },
  })
}
