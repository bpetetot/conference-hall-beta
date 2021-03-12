module.exports = `<html>
  <head>
    <style type="text/css">
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
        break-after: always;
        page-break-after: always;
        -webkit-region-break-after: always;

        display: grid;
        grid-template-columns: 98mm 98mm;
        grid-template-rows: 70mm 70mm 70mm 70mm;
        grid-gap: 1mm;
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
    <% _.forEach(pages, (page) => { %>
    <div class="page">
        <%= page %>
    </div>
    <% }); %>
  </body>
</html>
`
