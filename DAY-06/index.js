const copyButton = document.querySelector('.copy-button');
const tooltipContainer = document.querySelector('.tooltip-wrapper');
const tooltip = document.querySelector('.tooltip');
const input = document.querySelector('#user-input');

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

const resetTooltip = () => {
  tooltipContainer.setAttribute('style', 'display: none');
  tooltip.textContent = 'Copy';
}

const resetCopyButton = () => {
  addSvgToDiv(copyButton, './clipboard.svg');
}

copyButton.addEventListener('mouseover', () => {
  tooltipContainer.setAttribute('style', 'display: block');
})

copyButton.addEventListener('mouseout', () => {
  resetCopyButton()
  resetTooltip()
})

copyButton.addEventListener('click', () => {
  tooltip.textContent = 'Copied!';
  addSvgToDiv(copyButton, './check.svg');
  navigator.clipboard.writeText(input.value);
})