import { firestore } from 'firebase-admin'
import { meanBy, isEmpty } from 'lodash'
import {
  EmailStatus,
  Event,
  EventCategory,
  EventFormat,
  EventType,
  EventVisibility,
  MessageChannel,
  Prisma,
  PrismaClient,
  ProposalStatus,
  RatingFeeling,
} from '@prisma/client'
import { mapLevels, timestampToDate } from './helpers'

type EventWithFormatsAndCats = Event & {
  formats: EventFormat[]
  categories: EventCategory[]
}

export async function migrateEvents(prisma: PrismaClient) {
  console.log('Migrate all events...')
  const eventsRef = await firestore().collection('events').get()
  const events = (await eventsRef.docs.map((doc) => ({ uid: doc.id, ...doc.data() }))) as any[]
  let count = 1
  for (const event of events) {
    console.log(`  >> Event ${count} / ${events.length} > ${event.name} (${event.uid})`)
    const newEvent = await createEvent(prisma, event)
    await createEventProposals(prisma, newEvent)
    count++
  }
}

async function createEvent(prisma: PrismaClient, event: any) {
  const settingsRef = await firestore()
    .collection('events')
    .doc(event.uid)
    .collection('settings')
    .doc(event.uid)
    .get()
  const settings = await settingsRef.data()

  // get and set organization
  const connectedOrganization = await connectOrganization(prisma, event)
  // get owner id
  const owner = event.owner && (await prisma.user.findUnique({ where: { uid: event.owner } }))
  // get surveys
  const connectedSurveys = await connectOrCreateSurveys(prisma, event.uid)

  const data: Prisma.EventCreateInput = {
    uid: event.uid,
    name: event.name,
    description: event.description,
    type: mapEventType(event.type),
    visibility: mapVisibility(event.visibility),
    organization: connectedOrganization,
    address: event?.address?.formattedAddress,
    lat: event?.address?.latLng?.lat,
    lng: event?.address?.latLng?.lng,
    timezone: event.address?.timezone?.id,
    contact: event.contact,
    website: event.website,
    bannerUrl: event.bannerUrl,
    conferenceStart: timestampToDate(event?.conferenceDates?.start),
    conferenceEnd: timestampToDate(event?.conferenceDates?.end),
    cfpStart:
      event.type === 'meetup' && event.cfpOpened // TODO CHECK
        ? new Date()
        : timestampToDate(event?.cfpDates?.start),
    cfpEnd: timestampToDate(event?.cfpDates?.end),
    formats: {
      createMany: {
        data:
          event?.formats?.map((format: any) => ({
            uid: format.id,
            name: format.name,
            description: format.description,
          })) ?? [],
      },
    },
    formatsRequired: Boolean(event?.mandatoryFields?.formats),
    categories: {
      createMany: {
        data:
          event?.categories?.map((category: any) => ({
            uid: category.id,
            name: category.name,
            description: category.description,
          })) ?? [],
      },
    },
    categoriesRequired: Boolean(event?.mandatoryFields?.categories),
    maxProposals: event?.maxProposals ? Number(event?.maxProposals) : undefined,
    creator: { connect: { id: owner?.id || 1 } },
    archived: Boolean(event?.archived),
    deliberationEnabled: Boolean(settings?.deliberation?.enabled),
    displayOrganizersRatings: !!settings?.deliberation?.displayRatings,
    displayProposalsRatings: !settings?.deliberation?.hideRatings,
    displayProposalsSpeakers: !settings?.deliberation?.blindRating,
    surveyEnabled: Boolean(event?.surveyActive),
    surveyQuestions: event.survey,
    emailOrganizer: settings?.notifications?.recipients?.contact ? event.contact : undefined,
    emailNotifications: settings?.notifications?.emails,
    slackWebhookUrl: settings?.slack?.webhookUrl,
    slackNotifications: settings?.slack?.notifications,
    apiKey: settings?.api?.apiKey,
    surveys: connectedSurveys,
    createdAt: timestampToDate(event?.createTimestamp),
    updatedAt: timestampToDate(event?.updateTimestamp),
  }

  return prisma.event.create({ data, include: { formats: true, categories: true } })
}

async function connectOrganization(prisma: PrismaClient, event: any) {
  if (!event.organization) return
  const organization = await prisma.organization.findUnique({ where: { uid: event.organization } })
  if (!organization) return
  return { connect: { id: organization?.id } }
}

function mapEventType(type: string) {
  switch (type) {
    case 'conference':
      return EventType.CONFERENCE
    case 'meetup':
      return EventType.MEETUP
    default:
      return EventType.CONFERENCE
  }
}

function mapVisibility(visibility: string) {
  switch (visibility) {
    case 'public':
      return EventVisibility.PUBLIC
    case 'private':
      return EventVisibility.PRIVATE
    default:
      return EventVisibility.PRIVATE
  }
}

async function connectOrCreateSurveys(prisma: PrismaClient, eventUid: string) {
  const surveysRef = await firestore()
    .collection('events')
    .doc(eventUid)
    .collection('surveys')
    .get()
  const surveys: any[] = await surveysRef.docs.map((doc) => doc.data())
  if (!surveys || surveys.length === 0) return undefined

  const connectedSurveys = []
  for (const survey of surveys) {
    const { uid, updateTimestamp, ...answers } = survey
    const user = await prisma.user.findUnique({ where: { uid } })
    if (!user) continue
    connectedSurveys.push({
      answers: mapAnswers(answers),
      userId: user.id,
      createdAt: timestampToDate(updateTimestamp),
      updatedAt: timestampToDate(updateTimestamp),
    })
  }

  return { createMany: { data: connectedSurveys } }
}

function mapAnswers(answers: any) {
  if (!answers) return undefined
  const mappedAnswers = { ...answers }
  if (answers.diet) {
    mappedAnswers.diet = Object.entries(answers.diet)
      .filter(([key, value]) => !isEmpty(value))
      .map(([key]) => key)
  }
  if (answers.transports) {
    mappedAnswers.transports = Object.entries(answers.transports)
      .filter(([key, value]) => !isEmpty(value))
      .map(([key]) => key)
  }
  return mappedAnswers
}

async function createEventProposals(prisma: PrismaClient, event: EventWithFormatsAndCats) {
  const proposalsRef = await firestore()
    .collection('events')
    .doc(event.uid)
    .collection('proposals')
    .get()
  const proposals = await proposalsRef.docs.map((doc) => ({ ...doc.data(), uid: doc.id }))
  for (const proposal of proposals) {
    await createProposal(prisma, event, proposal)
  }
}

async function createProposal(prisma: PrismaClient, event: EventWithFormatsAndCats, proposal: any) {
  const speakersIds = await findSpeakersIds(prisma, proposal.speakers)
  const connectedTalk = await connectTalk(prisma, proposal.uid)
  const connectedRatings = await connectOrCreateRatings(prisma, event.uid, proposal.uid)
  const connectedMessages = await connectOrCreateMessages(prisma, event.uid, proposal.uid)

  const data: Prisma.ProposalCreateInput = {
    talk: connectedTalk,
    event: { connect: { id: event.id } },
    title: proposal.title,
    abstract: proposal.abstract,
    level: mapLevels(proposal.level),
    languages: proposal.language ? [proposal.language] : undefined,
    references: proposal.references,
    comments: proposal.comments,
    speakers: { connect: speakersIds },
    formats: connectFormat(proposal.formats, event),
    categories: connectCategory(proposal.categories, event),
    status: mapStatus(proposal.state),
    emailStatus: mapEmailStatus(proposal.emailStatus),
    speakerNotified: !!proposal.emailSent,
    createdAt: timestampToDate(proposal?.createTimestamp),
    updatedAt: timestampToDate(proposal?.updateTimestamp),
    avgRateForSort: averageRatings(connectedRatings?.createMany?.data),
    messages: connectedMessages,
    ratings: connectedRatings,
  }

  return prisma.proposal.create({ data })
}

async function connectTalk(prisma: PrismaClient, proposalUid: string) {
  const talk = await prisma.talk.findUnique({ where: { uid: proposalUid } })
  if (!talk) return
  return { connect: { id: talk.id } }
}

async function findSpeakersIds(prisma: PrismaClient, speakers: { [uid: string]: boolean }) {
  const speakersUids = Object.entries(speakers)
    .filter(([uid, isSpeaker]) => isSpeaker)
    .map(([uid, _]) => uid)

  return prisma.user.findMany({
    select: { id: true },
    where: { uid: { in: speakersUids } },
  })
}

function connectFormat(format: string, event: EventWithFormatsAndCats) {
  if (!format) return undefined
  const current = event.formats.find((f) => f.uid === format)
  if (!current) return undefined
  return { connect: [{ id: current.id }] }
}

function connectCategory(category: string, event: EventWithFormatsAndCats) {
  if (!category) return undefined
  const current = event.categories.find((c) => c.uid === category)
  if (!current) return undefined
  return { connect: { id: current.id } }
}

async function connectOrCreateRatings(prisma: PrismaClient, eventUid: string, proposalUid: string) {
  const ratingsRef = await firestore()
    .collection('events')
    .doc(eventUid)
    .collection('proposals')
    .doc(proposalUid)
    .collection('ratings')
    .get()
  const ratings: any[] = await ratingsRef.docs.map((doc) => doc.data())
  if (!ratings || ratings.length === 0) return undefined

  const connectedRatings = []
  for (const rating of ratings) {
    const user = await prisma.user.findUnique({ where: { uid: rating.uid } })
    if (!user) continue
    connectedRatings.push({
      rating: rating.rating >= 0 ? rating.rating : null,
      feeling: mapFeeling(rating.feeling),
      userId: user.id,
      createdAt: timestampToDate(rating?.updateTimestamp),
      updatedAt: timestampToDate(rating?.updateTimestamp),
    })
  }

  return { createMany: { data: connectedRatings } }
}

function averageRatings(ratings?: { rating: any }[]) {
  if (!ratings) return 0
  const ratingsForAvg = ratings.filter((r) => r.rating !== null)
  if (ratingsForAvg.length === 0) return 0
  return meanBy(ratingsForAvg, 'rating')
}

async function connectOrCreateMessages(
  prisma: PrismaClient,
  eventUid: string,
  proposalUid: string,
) {
  const messagesRef = await firestore()
    .collection('events')
    .doc(eventUid)
    .collection('proposals')
    .doc(proposalUid)
    .collection('organizersThread')
    .get()
  const messages: any[] = await messagesRef.docs.map((doc) => doc.data())
  if (!messages || messages.length === 0) return undefined

  const connectedMessages = []
  for (const message of messages) {
    const user = await prisma.user.findUnique({ where: { uid: message.uid } })
    if (!user) continue
    connectedMessages.push({
      userId: user.id,
      message: message.message,
      channel: MessageChannel.ORGANIZER,
      createdAt: timestampToDate(message?.date),
      updatedAt: timestampToDate(message?.date),
    })
  }

  return { createMany: { data: connectedMessages } }
}

function mapFeeling(feeling: string) {
  switch (feeling) {
    case 'love':
      return RatingFeeling.POSITIVE
    case 'hate':
      return RatingFeeling.NEGATIVE
    case 'neutral':
      return RatingFeeling.NEUTRAL
    case 'noopinion':
      return RatingFeeling.NO_OPINION
    default:
      return undefined
  }
}

function mapStatus(status: string) {
  switch (status) {
    case 'submitted':
      return ProposalStatus.SUBMITTED
    case 'accepted':
      return ProposalStatus.ACCEPTED
    case 'confirmed':
      return ProposalStatus.CONFIRMED
    case 'rejected':
      return ProposalStatus.REJECTED
    case 'declined':
      return ProposalStatus.DECLINED
    default:
      return ProposalStatus.SUBMITTED
  }
}

function mapEmailStatus(status: string) {
  switch (status) {
    case 'sent':
      return EmailStatus.SENT
    case 'delivered':
      return EmailStatus.DELIVERED
    default:
      return undefined
  }
}
