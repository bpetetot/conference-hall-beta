import { firestore } from 'firebase-admin'
import { InviteType, Organization, OrganizationRole, Prisma, PrismaClient } from '@prisma/client'
import { timestampToDate } from './helpers'

export async function migrateOrganizations(prisma: PrismaClient) {
  console.log('Migrate all organizations...')
  const organizationsRef = await firestore().collection('organizations').get()
  const organizations = (await organizationsRef.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  }))) as any[]

  let count = 1
  for (const organization of organizations) {
    console.log(
      `  >> Organization ${count} / ${organizations.length} > ${organization.name} (${organization.uid})`,
    )
    await createOrganization(prisma, organization)
    count++
  }
}

async function createOrganization(prisma: PrismaClient, organization: any) {
  const members = await findMembers(prisma, organization.members)

  const data: Prisma.OrganizationCreateInput = {
    uid: organization.uid,
    name: organization.name,
    createdAt: timestampToDate(organization.createTimestamp),
    updatedAt: timestampToDate(organization.updateTimestamp),
    members: { create: members },
  }

  const newOrga = await prisma.organization.create({ data })
  await createOrganizationInvite(prisma, organization.uid, newOrga)
}

async function findMembers(prisma: PrismaClient, members: { [uid: string]: string }) {
  if (!members || Object.keys(members).length === 0) {
    return
  }
  const users = await prisma.user.findMany({
    select: { id: true, uid: true },
    where: { uid: { in: Object.keys(members) } },
  })
  return users.map((user) => ({
    member: { connect: { id: user.id } },
    role: mapRole(members[user.uid]),
  }))
}

function mapRole(role: string) {
  switch (role) {
    case 'reviewer':
      return OrganizationRole.REVIEWER
    case 'member':
      return OrganizationRole.MEMBER
    case 'owner':
      return OrganizationRole.OWNER
    default:
      return OrganizationRole.REVIEWER
  }
}

async function createOrganizationInvite(
  prisma: PrismaClient,
  orgaUid: string,
  newOrga: Organization,
) {
  const invitesRef = await firestore()
    .collection('invites')
    .where('entity', '==', 'organization')
    .where('entityId', '==', orgaUid)
    .get()

  const invites = await invitesRef.docs.map((doc) => ({ ...doc.data(), uid: doc.id }))
  if (invites.length <= 0) return
  const invite = invites[0] as any

  const owner = await prisma.user.findUnique({ where: { uid: invite.creator } })

  const inviteData: Prisma.InviteCreateInput = {
    uuid: invite.uid,
    type: InviteType.ORGANIZATION,
    entityId: newOrga.id,
    createdAt: timestampToDate(invite?.createTimestamp),
    updatedAt: timestampToDate(invite?.updateTimestamp),
    invitedBy: { connect: { id: owner?.id } },
    organization: { connect: { id: newOrga.id } },
  }

  await prisma.invite.create({ data: inviteData })
}
