
const searchInput = document.getElementById('movie-search-input');
const selectedMovieContainer = document.getElementById('selected-movie');  
const movieContainer = document.getElementById('movies');
const movieList = document.getElementById('movie-list');
const clearButton = document.getElementById('clear-button');

const getMovies = async () => {
  const response = await fetch('./top-100-christmas-movies.json');
  const movies = await response.json();
  return movies;
}

let selectedMovie = null;
let movies = [];

const cleanTitle = (title) => title.split(".")[1].trim()

const createMovie = (movie) => {
  const { id, img, title, year } = movie || {};

  const coverImg = document.createElement('img');
  const movieTitle = document.createElement('h2');
  const yearEl = document.createElement('p');
  coverImg.src = img;
  coverImg.alt = cleanTitle(`${title} cover image`);
  movieTitle.textContent = cleanTitle(title);
  yearEl.textContent = year;

  return {
    id, 
    coverImg,
    movieTitle,
    yearEl
  };
}

getMovies()
  .then((movieData) => {
    movies = movieData;

    movieData.forEach((movie) => {
      const movieElement = document.createElement('li');
      movieElement.classList.add('movie');
      const infoContainer = document.createElement('div');

      const { id, coverImg, movieTitle, yearEl } = createMovie({
        id: movie["Position"],
        img: movie["Image"],
        title: movie["Title"],
        year: movie["Year"]
      });

      movieElement.setAttribute("id", id);
      movieElement.setAttribute("tabindex", 0);
      movieElement.appendChild(coverImg);
      infoContainer.appendChild(movieTitle);
      infoContainer.appendChild(yearEl);
      movieElement.appendChild(infoContainer);
      movieList.appendChild(movieElement);
    });

    const handleSelection = (element) => {
      const currentSelected = document.querySelector('.selected');
      if (currentSelected) {
        currentSelected.classList.remove('selected');
      }
      element.classList.add('selected');
      selectedMovie = element;
      searchInput.classList.add('hidden');
      selectedMovieContainer.classList.remove('hidden');
    };

    movieList.addEventListener('click', (e) => {
      const movieElement = e.target.closest('.movie');
      if (movieElement) {
        handleSelection(movieElement);
      }
    });

    movieList.addEventListener('keydown', (e) => {
      const movieElement = e.target.closest('.movie');
      if (movieElement && e.key === "Enter") {
        handleSelection(movieElement);
      }
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });

searchInput.addEventListener('click', () => {
  movieContainer.classList.remove('hidden');
})

searchInput.addEventListener('input', (e) => {
  const searchValue = e.target.value;
  const movieEls = document.querySelectorAll('.movie');
  movieEls.forEach((movieEl) => {
    const movieTitle = movieEl.querySelector('h2').textContent.toLowerCase();
    if (movieTitle.includes(searchValue.toLowerCase())) {
      movieEl.classList.remove('hidden');
    } else {
      movieEl.classList.add('hidden');
    }
  })
})

const handleSelectMovie = () => {
  const found = movies.find(movie => movie["Position"] == selectedMovie.id);
  const currentFavImg = document.querySelector('.movie-img img');
  const currentSelectedMovieTitle = document.querySelector('#selected-movie h2');
  const currentSelectedMovieYear = document.querySelector('#selected-movie p');
  const favoriteImg = document.createElement('img');
  favoriteImg.src = found["Image"];
  const movieTitle = document.createElement('h2');
  const year = document.createElement('p');
  movieTitle.textContent = cleanTitle(found["Title"]);
  year.textContent = found["Year"];

  if (currentFavImg) {
    currentFavImg.replaceWith(favoriteImg);
  }

  if (currentSelectedMovieTitle) {
    currentSelectedMovieTitle.replaceWith(movieTitle);
  }

  if (currentSelectedMovieYear) {
    currentSelectedMovieYear.replaceWith(year);
  }

  const favImgContainer = document.querySelector('.movie-img');
  favImgContainer.appendChild(favoriteImg);

  selectedMovieContainer.appendChild(movieTitle);
  selectedMovieContainer.appendChild(year);
}

document.body.addEventListener("click", (e) => {
  if (selectedMovie) {
    handleSelectMovie();
  }
})

document.body.addEventListener("keydown", (e) => {
  if (selectedMovie && e.key === "Enter") {
    handleSelectMovie();
  }
})

clearButton.addEventListener('click', () => {
  selectedMovie = null;
  searchInput.classList.remove('hidden');
  selectedMovieContainer.classList.add('hidden');
  const favImg = document.querySelector('.movie-img img');
  favImg.remove();
  const selectedMovieTitle = document.querySelector('.movie.selected');
  selectedMovieTitle.classList.remove('selected');
})