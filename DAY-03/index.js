const textArea = document.querySelector('textarea');

const DEFAULT_ROWS = 5

textArea.rows = DEFAULT_ROWS

document.addEventListener('input', (e) => {
  textArea.rows = textArea.value.split("\n").length < DEFAULT_ROWS 
  ? DEFAULT_ROWS 
  : textArea.value.split("\n").length;
})