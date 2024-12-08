const upperPanel = document.getElementById('upper-panel')
const leftPanel = document.getElementById('left-panel')
const rightPanel = document.getElementById('right-panel')
const xResize = document.getElementById('x-resize')
const yResize = document.getElementById('y-resize')
const container = document.querySelector('main')

let dragX = false
let dragY = false

let currentXPosition = leftPanel.getBoundingClientRect().width + yResize.getBoundingClientRect().width;
let currentYPosition = upperPanel.getBoundingClientRect().height + xResize.getBoundingClientRect().height;

yResize.addEventListener("mousedown", (e) => {
  dragX = true;
  currentXPosition = e.x;
});

xResize.addEventListener("mousedown", (e) => {
  dragY = true;
  currentYPosition = e.y;
})

container.addEventListener("mousemove", (e) => {
  currentXPosition = e.x;
  currentYPosition = e.y;
  if (dragX) {
    e.preventDefault();
    leftPanel.style.width = currentXPosition + yResize.getBoundingClientRect().width + "px";
    rightPanel.style.width = container.getBoundingClientRect().width - currentXPosition + yResize.getBoundingClientRect().width + "px";
  }

  if (dragY) {
    e.preventDefault();
    upperPanel.style.height = currentYPosition + xResize.getBoundingClientRect().height + "px";
    leftPanel.style.height = container.getBoundingClientRect().height - currentYPosition + xResize.getBoundingClientRect().height + "px";
    rightPanel.style.height = container.getBoundingClientRect().height - currentYPosition + xResize.getBoundingClientRect().height + "px";
  }
});

container.addEventListener("mouseup", (e) => {
  dragX = false;
  dragY = false;
})