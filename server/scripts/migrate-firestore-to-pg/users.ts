import { firestore } from 'firebase-admin'
import { Prisma, PrismaClient, User } from '@prisma/client'
import { timestampToDate } from './helpers'
import { migrateUserTalks } from './user-talks'

const USERS_BATCH_SIZE = 100

export async function migrateUsers(prisma: PrismaClient) {
  console.log('Migrate all users...')
  const usersRef = await firestore().collection('users').get()
  const users = await usersRef.docs.map((doc) => mapUser(doc.data()))
  const payload = await prisma.user.createMany({ data: users })
  console.log(`  >> Total users : ${payload.count}`)
  console.log('Migrate all users talks...')
  await migrateUsersTalks(prisma, payload.count)
}

function mapUser(user: any): Prisma.UserCreateInput {
  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email, // TODO unique ?
    bio: user.bio,
    photoURL: user.photoURL,
    betaAccess: user.betaAccess,
    github: user.github,
    twitter: user.twitter,
    company: user.company,
    references: user.speakerReferences,
    address: user.address?.formattedAddress,
    lat: user.address?.latLng?.lat,
    lng: user.address?.latLng?.lng,
    timezone: user.address?.timezone?.id,
    createdAt: timestampToDate(user.createTimestamp),
    updatedAt: timestampToDate(user.updateTimestamp),
  }
}

async function migrateUsersTalks(prisma: PrismaClient, usersCount: number) {
  let cursorId: number | null = null
  let users: User[] | null = null
  let count = 1
  while (users === null || users?.length > 0) {
    users = await prisma.user.findMany({
      take: USERS_BATCH_SIZE,
      skip: cursorId ? 1 : 0,
      cursor: cursorId ? { id: cursorId } : undefined,
      orderBy: { id: 'asc' },
    })
    cursorId = users[users?.length - 1]?.id
    if (users?.length > 0) {
      for (const user of users) {
        console.log(`  >> user ${count} / ${usersCount} > ${user.name}`)
        await migrateUserTalks(prisma, user)
        count++
      }
    }
  }
}
