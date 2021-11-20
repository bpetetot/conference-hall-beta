import { firestore } from 'firebase-admin'
import { PrismaClient } from '@prisma/client'

export async function migrateBetaAccess(prisma: PrismaClient) {
  console.log('Migrate all beta access...')
  const betaAccessRef = await firestore().collection('betaAccess').get()
  const betaAccessList = await betaAccessRef.docs.map((doc) => {
    const data = doc.data()
    return {
      uuid: doc.id,
      organization: data.organization,
    }
  })
  const payload = await prisma.betaKey.createMany({ data: betaAccessList })
  console.log(`  >> Total beta keys : ${payload.count}`)
}
