module.exports = `<div class="card">
  <div class="card-header">
    <div class="card-title"><%= card.title %></div>
  </div>
  <div class="card-info">
    <div class="card-speakers">
      By <%= card.speakers %>
    </div>
    <div class="card-info-row">
      <div><%= card.categories || '-'  %></div>
      <div><%= card.formats || '-'  %></div>
    </div>
    <div class="card-info-row">
      <div><%= card.level || '-'  %></div>
      <div><%= card.language || '-'  %></div>
    </div>
    <div class="card-rating">
      <div class="card-rating-details">
        <div><%= card.loves %><span>❤️</span></div>
        <div><%= card.hates %><span>☠️</span></div>
      </div>
      <div class="card-rating-rate"><%= card.rating %></div>
    </div>
  </div>
</div>
`
