const LIGHT_BLUE = "#26C9C3"
const DARK_BLUE = "#191349"
const inputContainer = document.getElementById('input-container')
const input = document.getElementById('password-input')
const eye = document.querySelector(".eye-btn")
const fullEye = document.getElementById('full-eye')
const halfEye = document.getElementById('half-eye')
const lightLock = document.querySelector(".lock.light")
const darkLock = document.querySelector(".lock.dark")

const initializeTheme = () => {
  eye.classList.add("light")
  inputContainer.style.backgroundColor = LIGHT_BLUE
  lightLock.setAttribute('style', 'display: none')
  fullEye.setAttribute('style', 'display: block')
  halfEye.setAttribute('style', 'display: none')
}

initializeTheme()

eye.addEventListener('click', () => {
  const input = document.getElementById('password-input')
  input.setAttribute('type', input.getAttribute('type') === 'password' ? 'text' : 'password')
  const eyeClasses = eye.classList.value
  eyeClasses.includes("light") ? getDarkTheme() : getLightTheme()
})

const getDarkTheme = () => {
  eye.classList.remove("light")
  eye.classList.add("dark")
  inputContainer.style.backgroundColor = DARK_BLUE
  lightLock.setAttribute('style', 'display: block')
  darkLock.setAttribute('style', 'display: none')
  input.style.color = 'white'
  fullEye.setAttribute('style', 'display: none')
  halfEye.setAttribute('style', 'display: block')
}

const getLightTheme = () => {
  eye.classList.remove("dark")
  eye.classList.add("light")
  inputContainer.style.backgroundColor = LIGHT_BLUE
  lightLock.setAttribute('style', 'display: none')
  darkLock.setAttribute('style', 'display: block')
  input.style.color = 'black'
  fullEye.setAttribute('style', 'display: block')
  halfEye.setAttribute('style', 'display: none')
}