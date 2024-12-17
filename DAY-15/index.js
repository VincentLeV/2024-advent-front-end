const iframe = document.querySelector('iframe')

const DEFAULT_PADDING = 50

document.addEventListener('DOMContentLoaded', () => {
  iframe.setAttribute("height", window.innerHeight - DEFAULT_PADDING)
  iframe.setAttribute("width", window.innerWidth - DEFAULT_PADDING)
})

window.addEventListener('resize', () => {
  iframe.setAttribute("height", window.innerHeight - DEFAULT_PADDING)
  iframe.setAttribute("width", window.innerWidth - DEFAULT_PADDING)
})