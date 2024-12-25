const pricingCard = document.querySelector('.pricing__card');
const toggle = document.querySelector('.pricing__toggle');

const pricing = {
  pro: {
    price: 18,
    description: "Per month with annual subscription discount; $216 billed up front. $20 if billed monthly.",
    subHeader: "Pro",
    subHeaderDescription: "For Claude power users",
    features: [
      "More usage than Free",
      "Access to Projects to organize documents and chats",
      "Ability to use more models, like Claude 3.5 Sonnet and Claude 3 Opus",
      "Early access to new features"
    ]
  },
  team: {
    price: 25,
    description: "Per person / month with annual subscription discount. $30 if billed monthly. Minimum 5 members.",
    subHeader: "Team",
    subHeaderDescription: "For fast-growing teams",
    features: [
      "More usage than Pro",
      "Central billing and administration",
      "Early access to collaboration features"
    ]
  }
}

const proPricingCard = `
  <div class="pricing__card__header">
    <h1 class="pricing__card__price">
      <span>$</span>
      ${pricing.pro.price}
    </h1>
    <p class="pricing__card__description">${pricing.pro.description}</p>
  </div>
      
  <div class="pricing__card__divider"></div>

  <div class="pricing__card__features">
    <h2 class="pricing__card__subheader">${pricing.pro.subHeader}</h2>
    <p class="pricing__card__subheader-description">${pricing.pro.subHeaderDescription}</p>
    <ul>
      ${pricing.pro.features.map(feature => `<li>${feature}</li>`).join('')}
    </ul>
  </div>
`

const teamPricingCard = `
  <div class="pricing__card__header">
    <h1 class="pricing__card__price">
      <span>$</span>
      ${pricing.team.price}
    </h1>
    <p class="pricing__card__description">${pricing.team.description}</p>
  </div>

  <div class="pricing__card__divider"></div>

  <div class="pricing__card__features">
    <h2 class="pricing__card__subheader">${pricing.team.subHeader}</h2>
    <p class="pricing__card__subheader-description">${pricing.team.subHeaderDescription}</p>
    <ul>
      ${pricing.team.features.map(feature => `<li>${feature}</li>`).join('')}
    </ul>
  </div>
`

document.addEventListener('DOMContentLoaded', () => {
  pricingCard.innerHTML = proPricingCard
})

toggle.addEventListener('change', (e) => {
  e.target.checked ? pricingCard.innerHTML = teamPricingCard : pricingCard.innerHTML = proPricingCard
})