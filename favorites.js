function renderFavorites() {
  const favoritesList = JSON.parse(localStorage.getItem("myWatchList")) || [];
  const favoritesContainer = document.getElementById("favorites-list");

  if (favoritesList.length === 0) {
    document
      .getElementById("favorites-section-text")
      .classList.remove("hidden");
  } else {
    document.getElementById("favorites-section-text").classList.add("hidden");
  }

  favoritesContainer.innerHTML = favoritesList
    .map(
      (movie) => `
          <div class="movie-card">
            <img src="${movie.Poster}" alt="${movie.Title} poster" />
            <div class="movie-info">
              <h3 class="text-shadow">${movie.Title}</h3>
              <button  class="remove-from-favorites-button" data-movie-id="${movie.imdbID}">
              <svg class="delete-svgIcon" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
              <p class="text-shadow">${movie.imdbRating}<i class="fa-solid fa-star"></i></p>
              <p class="text-shadow">Runtime: ${movie.Runtime}</p>
              <p class="text-shadow"><span class="reddify">${movie.Genre}</span></p>
              <p class="text-shadow">${movie.Plot}</p>
            </div>
          </div>`
    )
    .join("");

  addRemoveButtonListeners();
}

function addRemoveButtonListeners() {
  const removeButtons = document.querySelectorAll(
    ".remove-from-favorites-button"
  );
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const movieId = button.getAttribute("data-movie-id");

      let myWatchList = JSON.parse(localStorage.getItem("myWatchList")) || [];

      myWatchList = myWatchList.filter((movie) => movie.imdbID !== movieId);

      localStorage.setItem("myWatchList", JSON.stringify(myWatchList));

      renderFavorites();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderFavorites);
