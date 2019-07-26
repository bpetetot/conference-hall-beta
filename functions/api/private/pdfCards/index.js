const {
  template, slice, pick, isNil,
} = require('lodash')
const puppeteer = require('puppeteer')

const cardTemplate = require('./card.template.js')
const cardsTemplate = require('./cards.template.js')

const displayRating = (rating) => {
  if (isNil(rating) || rating < 0) return '-'
  if (rating.toString().indexOf('.') !== -1) {
    return rating.toFixed(1)
  }
  return rating
}

const getCards = ({
  speakers, formats, categories, talks,
}) => talks.map((talk) => {
  const format = formats.find(({ id }) => talk.formats === id)
  const category = categories.find(({ id }) => talk.categories === id)
  const speakersTalk = speakers.filter(s => talk.speakers.includes(s.uid))

  return {
    ...pick(talk, ['title', 'level', 'language', 'loves', 'hates']),
    rating: displayRating(talk.rating),
    formats: format && format.name,
    categories: category && category.name,
    speakers: speakersTalk.map(s => s.displayName).join(' & '),
  }
})

const printPDF = async (data) => {
  const cardTemplateCompiled = template(cardTemplate)
  const cards = getCards(data).map(card => cardTemplateCompiled({ card }))

  const PAGE_SIZE = 8
  const pages = []
  for (let i = 0; i < cards.length; i += PAGE_SIZE) {
    const page = slice(cards, i, i + PAGE_SIZE).join('\n')
    pages.push(page)
  }

  const cardsTemplateCompiled = template(cardsTemplate)
  const html = cardsTemplateCompiled({ pages })

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setContent(html)
  const pdf = await page.pdf({ format: 'A4' })
  await browser.close()

  return pdf
}

module.exports = {
  printPDF,
}
