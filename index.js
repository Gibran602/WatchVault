const movieApiKey = "84e51a6a";

const movieSearchInput = document.getElementById("movie-search-input");
const movieSearchBtn = document.getElementById("movie-search-btn");
const moviesList = document.getElementById("movies-list");
const mainSection = document.querySelector(".main-text");

movieSearchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    movieSearchBtn.click();
  }
});

movieSearchBtn.addEventListener("click", () => {
  mainSection.classList.add("hidden");
  getMovieData(movieSearchInput.value);
  movieSearchInput.value = "";
});

async function getMovieData(movieTitle) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${movieApiKey}&s=${movieTitle}&plot=full`
  );

  const searchData = await response.json();
  const movies = searchData.Search;

  if (!movies || movies.length === 0) {
    moviesList.innerHTML =
      "<p class='movie-not-found'>Unable to find what you're looking for. Please try another search.</p>";
  } else {
    renderMovies(movies);
  }
}

async function renderMovies(movies) {
  let movieCards = "";

  for (const movie of movies) {
    const movieResponse = await fetch(
      `https://www.omdbapi.com/?apikey=${movieApiKey}&i=${movie.imdbID}`
    );
    const movieData = await movieResponse.json();

    movieCards += `
      <div class="movie-card">
        <img src="${movie.Poster}" alt="${movie.Title} poster" />
        <div class="movie-info">
            <h3 class="text-shadow">${movie.Title}
            <button id="favorites-btn" class="add-to-favorites-button" 
              data-movie-id="${movie.imdbID}" 
              data-movie-title="${movie.Title}" 
              data-movie-poster="${movieData.Poster}"
              data-movie-rating="${movieData.imdbRating}"
              data-movie-runtime="${movieData.Runtime}"
              data-movie-genre="${movieData.Genre}"
              data-movie-plot="${movieData.Plot}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" class="svg-icon"><g stroke-width="1.5" stroke-linecap="round" stroke="#de8a2a"><circle r="7.5" cy="10" cx="10"></circle><path d="m9.99998 7.5v5"></path><path d="m7.5 9.99998h5"></path></g></svg>
            <span class="lable">Add</span>
            </button></h3>
            <p class="text-shadow">${movieData.imdbRating}<i class="fa-solid fa-star"></i></p>
            <p class="text-shadow" id="runtime-text">Runtime: ${movieData.Runtime}</p>
            <p class="text-shadow"><span class="reddify">${movieData.Genre}</span></p>
            <p class="text-shadow" id="plot-text">${movieData.Plot}</p>
        </div>
      </div>

    `;

    moviesList.innerHTML = movieCards;

    addFavoriteButtonListeners();
  }
}

function addFavoriteButtonListeners() {
  const favoriteButtons = document.querySelectorAll(".add-to-favorites-button");

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const movieData = {
        imdbID: button.getAttribute("data-movie-id"),
        Title: button.getAttribute("data-movie-title"),
        Poster: button.getAttribute("data-movie-poster"),
        imdbRating: button.getAttribute("data-movie-rating"),
        Runtime: button.getAttribute("data-movie-runtime"),
        Genre: button.getAttribute("data-movie-genre"),
        Plot: button.getAttribute("data-movie-plot"),
      };

      let myWatchList = JSON.parse(localStorage.getItem("myWatchList")) || [];

      if (!myWatchList.some((movie) => movie.imdbID === movieData.imdbID)) {
        myWatchList.push(movieData);
        localStorage.setItem("myWatchList", JSON.stringify(myWatchList));
      }
    });
  });
}
