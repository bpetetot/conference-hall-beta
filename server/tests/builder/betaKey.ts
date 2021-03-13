import { Prisma } from '@prisma/client'
import { prisma } from '../../src/db/db'

export async function buildBetaKey(data: Partial<Prisma.BetaKeyCreateInput> = {}) {
  return prisma.betaKey.create({ data })
}
