const reindeerList = document.querySelector('.reindeer-options');
const movieList = document.querySelector('.movie-options');
const form = document.querySelector('form');

const setAttributes = (el, attrs) => {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  } 
}

const createRadioOptions = ({
  el, name, value, classNames, text
}) => {
  const container = document.createElement('div');
    const input = document.createElement('input');
    setAttributes(input, {
      type: 'radio',
      id: value,
      name,
      value: text ?? value,
      required: true,
      class: classNames
    });
    label = document.createElement('label');
    label.setAttribute('for', value);  
    label.textContent = text ?? value;
    el.appendChild(container);
    container.appendChild(input);
    container.appendChild(label);
}

const initializeFormData = () => {
  const data = JSON.parse(localStorage.getItem('day9'));
  if (data) {
    form.name.value = data.name;
    form.email.value = data.email;
    form.reindeer.value = data.reindeer;
    form.movie.value = data.movie;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const reindeers = ["Dasher", "Vixen", "Donner", "Dancer", "Comet", "Blitzen", "Prancer", "Cupid", "Rudolph"];
  const movies = ["Elf (2003)", "Home Alone (1990)", "The Grinch (2018)", "It's a Wonderful Life (1946)", "Die Hard (1988)"];
  reindeers.forEach((reindeer) => createRadioOptions({
    el: reindeerList, 
    name: "reindeer", 
    value: reindeer, 
    classNames: "radio"
  }));
  movies.forEach((movie) => createRadioOptions({
    el: movieList, 
    name: "movie", 
    value: movie.split(" ").join("-"), 
    text: movie, 
    classNames: "checkbox"
  }));
})

window.addEventListener('load', () => {
  initializeFormData();
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const reindeer = formData.get('reindeer');
  const movie = formData.get('movie');
  localStorage.setItem('day9', JSON.stringify({
    name,
    email,
    reindeer,
    movie
  }));
})

