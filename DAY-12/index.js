let quote

const getQuote = async () => {
  try {
    const data = await fetch('https://api.api-ninjas.com/v1/quotes', {
      headers: {
        'X-Api-Key': "+XKs265JGQqWvsYN21d4uw==LrlSeUKTzF3zohoT"
      }
    })
    const [res] = await data.json()
    return res
  } catch (error) {
    console.log(error)
  }
}

const displayQuote = (quote) => {
  const quoteContainer = document.querySelector('.quote')
  const quoteElement = document.createElement('p')
  const quotationMark = document.createElement("img")
  quotationMark.src = "./quotation-marks.svg"
  quoteElement.textContent = quote
  quoteContainer.appendChild(quotationMark)
  quoteContainer.appendChild(quoteElement)
}

document.addEventListener('DOMContentLoaded', async () => {
  const { quote } = await getQuote()
  displayQuote(quote)
})