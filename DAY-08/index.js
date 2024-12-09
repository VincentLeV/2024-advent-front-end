const input = document.querySelector('input');
const tagList = document.querySelector('.tags');

const REMOVE_ICON_COLOR = "#6B6B6B"
const REMOVE_ICON_COLOR_HOVER = "#ff0000";

let keyCombo = []

const addSvgToDiv = async (element, svgFilePath) => {
  try {
    const response = await fetch(svgFilePath);
    if (!response.ok) throw new Error('Network response was not ok');
    const svgContent = await response.text();
    if (element) element.innerHTML = svgContent;
  } catch (error) {
    console.error('Error fetching the SVG file:', error);
  }
};

const createTag = (value) => {
  const tagEl = document.createElement("li");
  const tagContent = document.createElement("div");
  const tagIcon = document.createElement("div");
  addSvgToDiv(tagIcon, './close.svg');
  const cleaned = value.replace(/,/g, "").trim();
  if (cleaned.length === 0) return;
  tagContent.textContent = cleaned; 
  tagIcon.addEventListener("mouseover", (e) => {
    const svg = tagIcon.querySelector('svg path');
    svg.setAttribute('fill', REMOVE_ICON_COLOR_HOVER);  
  })
  tagIcon.addEventListener("mouseleave", (e) => {
    const svg = tagIcon.querySelector('svg path');
    svg.setAttribute('fill', REMOVE_ICON_COLOR);
  })
  tagEl.classList.add("tag");
  tagEl.appendChild(tagContent);
  tagEl.appendChild(tagIcon);
  tagList.insertBefore(tagEl, input);
}

input.addEventListener("keydown", (e) => {
  if (e.key === ",") keyCombo.push(e.key);
  if (e.key === " ") keyCombo.push(" ")

  if (new Set(keyCombo).has(",") && new Set(keyCombo).has(" ")) {
    e.preventDefault();
    keyCombo = [];
    createTag(e.target.value);
    input.value = ""
  }
})

document.addEventListener("click", (e) => {
  const tag = e.target.closest('.tag');
  if (tag) tag.remove()
})

