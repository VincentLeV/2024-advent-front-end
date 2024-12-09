const inputContainer = document.querySelector('.input-container');
const input = document.querySelector('input');
const slugText = document.querySelector('.slug');

const INPUT_OUTLINE_COLOR = "#0015FF"
const BORDER_COLOR = "#CFCECE"

input.addEventListener("focus", (e) => {
  inputContainer.setAttribute('style', `border: 3px solid ${INPUT_OUTLINE_COLOR}`);
})

input.addEventListener("blur", (e) => {
  inputContainer.setAttribute('style', `border: 3px solid ${BORDER_COLOR}`);
})

input.addEventListener('input', (e) => {
  let cleanedStr = e.target.value.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
  cleanedStr = cleanedStr.replace(/\s+/g, " ").trim();
  slugText.textContent = `${cleanedStr.length > 0 ? "/" : ""}${cleanedStr.split(' ').join('-').toLowerCase()}`;
})