const clockContainer = document.querySelector(".clock-container")

const INTERVAL = 1000 * 60

const getCurrentTime = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedHours = hours > 12 && hours < 24 ? hours - 12 : hours
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const suffix = hours >= 12 && hours < 24 ? 'PM' : 'AM'

  return `${formattedHours}:${formattedMinutes} ${suffix}`
}

const initializeClock = () => {
  const clock = document.createElement('div')
  clock.classList.add('clock')
  clock.textContent = getCurrentTime()
  clockContainer.appendChild(clock)
}

const updateClock = (time) => {
  const clock = document.querySelector('.clock')
  clock.textContent = time
}

document.addEventListener('DOMContentLoaded', () => {
  initializeClock()
})

setInterval(() => {
  const time = getCurrentTime()
  updateClock(time)
}, INTERVAL);