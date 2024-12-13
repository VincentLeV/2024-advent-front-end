const speedDial = document.querySelector('#speed-dial');
const socialMediaButtons = document.querySelectorAll('.social-media-button');

const BASE_FLY_POSITION = "translateX(0) translateY(0)"

const ANIMATION_TRANSLATE_VALUES = [
  { x: '-10vw', y: '5vh' },
  { x: '-12vw', y: '-5vh' },
  { x: '-10vw', y: '-15vh' },
  { x: '-5vw', y: '-20vh' },
  { x: '1vw', y: '-20vh' },
];

const ANIMATION_DURATION = "0.5s"

const FLY_ANIMATION = `ease-in-out ${ANIMATION_DURATION} forwards`

const FADE_ANIMATION = `${ANIMATION_DURATION} linear forwards`

const initializeAnimation = () => {
  const styleSheet = document.createElement("style");
  document.head.appendChild(styleSheet);

  ANIMATION_TRANSLATE_VALUES.forEach((anim, index) => {
    styleSheet.sheet.insertRule(`
      .fly-out-${index} {
        animation: fly-out-${index} ${FLY_ANIMATION}, fade-in ${FADE_ANIMATION};
      }
    `, styleSheet.sheet.cssRules.length);

    styleSheet.sheet.insertRule(`
      .fly-in-${index} {
        animation: fly-in-${index} ${FLY_ANIMATION}, fade-out ${FADE_ANIMATION};
      }
    `, styleSheet.sheet.cssRules.length);

    styleSheet.sheet.insertRule(`
      @keyframes fly-out-${index} {
        0% {
          transform: ${BASE_FLY_POSITION};
        }
        100% {
          transform: translateX(${anim.x}) translateY(${anim.y});
        }
      }
    `, styleSheet.sheet.cssRules.length);

    styleSheet.sheet.insertRule(`
      @keyframes fly-in-${index} {
        0% {
          transform: translateX(${anim.x}) translateY(${anim.y});
        }
        100% {
          transform: ${BASE_FLY_POSITION};
        }
      }
    `, styleSheet.sheet.cssRules.length);

    styleSheet.sheet.insertRule(`
      @keyframes fade-in {
        60% { opacity: 0; }
        100% { opacity: 1; }
      }
    `, styleSheet.sheet.cssRules.length);

    styleSheet.sheet.insertRule(`
      @keyframes fade-out {
        0% { opacity: 1; }
        40% { opacity: 0; }
      }
    `, styleSheet.sheet.cssRules.length);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeAnimation();
});

speedDial.addEventListener('click', () => {
  const currentIcon = document.querySelector('#speed-dial img');
  const newIcon = document.createElement('img');
  newIcon.src = 
  speedDial.classList.toggle('open');
  if (speedDial.classList.contains('open')) {
    speedDial.classList.remove('spin-in');
    speedDial.classList.add('spin-out');
    socialMediaButtons.forEach((button, index) => {
      button.classList.add(`fly-out-${index}`)
      button.classList.add("fade-in")
      button.classList.remove(`fly-in-${index}`)
      button.classList.remove("fade-out")
    })
    newIcon.src = './close.svg';
    speedDial.setAttribute('aria-expanded', 'true')
  } else {
    speedDial.classList.add('spin-in');
    speedDial.classList.remove('spin-out');
    socialMediaButtons.forEach((button, index) => {
      button.classList.remove(`fly-out-${index}`)
      button.classList.remove("fade-in")
      button.classList.add(`fly-in-${index}`)
      button.classList.add("fade-out")
    })
    newIcon.src = './megaphone.svg';
    speedDial.setAttribute('aria-expanded', 'false')
  }
  speedDial.replaceChild(newIcon, currentIcon);
})