import { Prisma } from '@prisma/client'
import { prisma } from './db'

type UserSearchCriterias = {
  email?: string
}

export async function getUser(id: number) {
  return prisma.user.findUnique({ where: { id } })
}

export async function findUsersBy(criterias: UserSearchCriterias = {}) {
  if (Object.keys(criterias).length === 0) {
    return []
  }
  return prisma.user.findMany({
    where: {
      email: { equals: criterias.email, mode: 'insensitive' },
    },
  })
}

export async function getUserByUid(uid: string) {
  return prisma.user.findUnique({ where: { uid } })
}

export async function getAuthUserByUid(uid: string) {
  return prisma.user.findUnique({ where: { uid }, include: { organizations: true } })
}

export async function createUser(uid: string, name: string, email?: string) {
  return prisma.user.create({
    data: { uid, name, email },
    include: { organizations: true },
  })
}

type UserUpdateInput = Prisma.UserUpdateInput

export async function updateUser(uid: string, data: UserUpdateInput) {
  return prisma.user.update({ data, where: { uid } })
}
