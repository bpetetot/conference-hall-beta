import { prisma } from './db'

export async function isBetaKeyValid(key: string) {
  const result = await prisma.betaKey.findUnique({ where: { uuid: key } })
  return Boolean(result)
}
