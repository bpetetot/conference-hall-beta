import { PrismaClient } from '@prisma/client'
import { initFirestore } from './firestore'
import { migrateUsers } from './users'
import { migrateOrganizations } from './organization'
import { migrateBetaAccess } from './betaAccess'
import { migrateEvents } from './events'

const prisma = new PrismaClient()

async function main() {
  try {
    initFirestore()
    console.time('Migration time')
    // Migrate beta keys
    await migrateBetaAccess(prisma)
    // Migrate all users
    await migrateUsers(prisma)
    // Migrate all organizations
    await migrateOrganizations(prisma)
    // Migrate events
    await migrateEvents(prisma)
    console.timeEnd('Migration time')
  } catch (error) {
    console.error(error)
  } finally {
    console.log('Disconnecting database...')
    await prisma.$disconnect()
    console.log('Done.')
    process.exit(0)
  }
}

main()
