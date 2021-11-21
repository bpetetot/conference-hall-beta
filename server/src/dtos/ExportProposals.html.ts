import hbs from 'handlebars'

export const HTML_HEADER = `
<html>
  <head>
    <style type="text/css">
      * {
        box-sizing: border-box;
      }
      html,body {
        margin: 0;
        padding: 0;
        background-color: #fff;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        font-size: 15pt;
      }
      @page { 
        size: 210mm 297mm;
        margin-top: 7mm;
        margin-bottom: 7mm;
        margin-left: 6.5mm;
        margin-right: 6.5mm;
      }
      .page {
        display: table;
        width: 100%;
      }
      .card {
        position: relative;
        background: #fff;
        border: 1px dashed #666;
        padding: 2mm;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        display: inline-block;
        width: 50%;
      }
      .card-header {
        font-weight: 700;
        font-size: 16pt;
        overflow: hidden;
      }
      .card-title {
        overflow: hidden;
      }
      .card-speakers {
        font-size: 12pt;
        padding-bottom: 2mm;
      }
      .card-info {
        margin-top: 4mm;
      }
      .card-info-row {
        display: flex;
        padding-bottom: 2mm;
      }
      .card-info-row > *:first-child {
        margin-right: 2mm;
      }
      .card-info-row > * {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11pt;
        width: 50%;
        border: 1px solid #ddd;
        border-radius: 3px;
        height: 7mm;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .card-rating {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin: 1mm;
      }
      .card-rating-details {
        display: flex;
        font-size: 12pt;
      }
      .card-rating-details span {
        margin-left: 2mm;
        margin-right: 4mm;
      }
      .card-rating-rate {
        font-size: 18pt;
      }
    </style>
  </head>
  <body>
    <div class="page">
`

export const HTML_FOOTER = `
    </div>
  </body>
</html>
`

const cardTemplate = hbs.compile(`
<div class="card">
  <div class="card-header">
    <div class="card-title">{{title}}</div>
  </div>
  <div class="card-info">
    <div class="card-speakers">
      By {{speakers}}
    </div>
    <div class="card-info-row">
      <div>{{categories}}</div>
      <div>{{formats}}</div>
    </div>
    <div class="card-info-row">
      <div>{{level}}</div>
      <div>{{languages}}</div>
    </div>
    <div class="card-rating">
      <div class="card-rating-details">
        <div>{{positives}}<span>❤️</span></div>
        <div>{{negatives}}<span>☠️</span></div>
      </div>
      <div class="card-rating-rate">
        {{average}}
      </div>
    </div>
  </div>
</div>
`)

export function proposalToHtml(proposal: {
  title: string
  speakers: string
  categories?: string
  formats?: string
  languages?: string
  level?: string | null
  average: number | null
  positives: number | null
  negatives: number | null
}) {
  return cardTemplate(proposal)
}
