const movieContainer = document.querySelector('.movies');
const movieList = document.querySelector('.movies__list');

const BATCH_SIZE = 15;

let throttleTimer = false;
let page = 1

const throttle = async (callback, time) => {
  if (throttleTimer) return;
  throttleTimer = true;
  setTimeout(async () => {
    await callback();
    throttleTimer = false;
  }, time);
};

const cleanTitle = (title) => title.split(".")[1].trim()

const getMovies = async () => {
  const response = await fetch('./resources/top-100-christmas-movies.json');
  const movies = await response.json();
  return movies;
}

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

const createSkeletonCard = () => {
  const skeletonCard = document.createElement('li');
  skeletonCard.classList.add("movies__movie", 'movies__skeleton-card');
  movieList.appendChild(skeletonCard);
}

const removeSkeletonCard = () => {
  const skeletonCard = document.querySelector('.movies__skeleton-card');
  if (skeletonCard) {
    skeletonCard.remove();
  }
}

const createMovies = (movies, page = 1) => {
  const movieBatch = movies.slice(page === 1 ? 0 : BATCH_SIZE * (page - 1), BATCH_SIZE * page);

  movieBatch.forEach((movie) => {
    const movieElement = document.createElement('li');
    movieElement.classList.add('movies__movie');
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
}

window.addEventListener("load", async () => {
  try {
    const movies = await getMovies();
    createMovies(movies);
    createSkeletonCard()
  } catch (error) {
    console.log("Error", error);
  }
})

window.addEventListener('scroll', async () => {
  throttle(async () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      page += 1
      const movies = await getMovies();
      createMovies(movies, page)
      removeSkeletonCard()
      createSkeletonCard()
    }
  }, 1500);
})