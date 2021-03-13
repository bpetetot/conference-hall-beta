import faker from 'faker'
import { Event, EventCategory, EventFormat, RatingFeeling, User } from '@prisma/client'
import { prisma } from '../../src/db/db'
import { buildCategory, buildEvent, buildFormat } from '../../tests/builder/event'
import { buildProposal } from '../../tests/builder/proposal'
import { buildTalk } from '../../tests/builder/talk'
import { buildUser } from '../../tests/builder/user'
import { buildSurvey } from '../../tests/builder/survey'
import { buildRating } from '../../tests/builder/rating'

const organizerUid = '0zh00kpJ1ecbZk0OE7s29Ask9QTc'
const TOTAL_EVENTS = 5
const TOTAL_PROPOSALS = 200

async function addSpeakerSurvey(event: Event, speaker: User) {
  await buildSurvey(speaker.id, event.id, {
    accomodation: faker.random.arrayElement(['yes', 'no']),
    gender: faker.random.arrayElement(['male', 'female']),
    tshirt: faker.random.arrayElement(['M', 'L']),
    info: faker.lorem.sentence(),
  })
}

async function addProposal(event: Event, format: EventFormat, category: EventCategory) {
  const speaker1 = await buildUser()
  const speaker2 = await buildUser()
  await addSpeakerSurvey(event, speaker1)

  const talk = await buildTalk(speaker1, {}, [speaker1, speaker2])
  return buildProposal(event.id, talk, {
    formats: { connect: [{ id: format.id }] },
    categories: { connect: [{ id: category.id }] },
  })
}

async function init() {
  if (!organizerUid) {
    console.error('You must give an user UID as main organizer')
    return
  }
  try {
    for (let i = 0; i < TOTAL_EVENTS; i++) {
      const orga = await prisma.user.findUnique({ where: { uid: organizerUid } })
      if (orga) {
        console.log(`Organizer "${orga.uid}"`)
        const event = await buildEvent(orga, {
          surveyEnabled: true,
          surveyQuestions: {
            accomodation: true,
            gender: true,
            tshirt: true,
            info: true,
          },
        })
        const format1 = await buildFormat(event.id)
        const format2 = await buildFormat(event.id)
        const category1 = await buildCategory(event.id)
        const category2 = await buildCategory(event.id)

        console.log(`  Event ${i + 1}/${TOTAL_EVENTS}: "${event.name}"`)
        for (let p = 0; p < TOTAL_PROPOSALS; p++) {
          const proposal = await addProposal(
            event,
            faker.random.arrayElement([format1, format2]),
            faker.random.arrayElement([category1, category2]),
          )
          await buildRating(orga.id, proposal.id, faker.random.number(5), RatingFeeling.NEUTRAL)
          console.log(`   - Proposal  ${p + 1}/${TOTAL_PROPOSALS}: "${proposal.title}"`)
        }
      } else {
        console.error(`User not found with UID "${organizerUid}"`)
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}

process.on('SIGTERM', prisma.$disconnect)
process.on('SIGINT', prisma.$disconnect)

init()
