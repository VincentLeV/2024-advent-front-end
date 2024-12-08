const textArea = document.querySelector('textarea');
const counterText = document.getElementById('counter-text');

document.addEventListener('input', () => {
  counterText.textContent = `Counter: ${textArea.value.length}`;
})