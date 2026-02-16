const userInputEl = document.getElementById("user-input");
const searchBtnEl = document.getElementById("search-btn");
const movieListEl = document.getElementById("movie-list");

movieListEl.innerHTML =
    "<h1 style = 'text-align: center'>Search for movies to add to your watchlist</h1>";

const apiUrl = "http://www.omdbapi.com/?apikey=e9bd20cd&";

function addToLocalList(movieData) {
    localStorage.setItem(movieData.imdbID, JSON.stringify(movieData));
}

function createMovieCard(movieData) {
    return `
        <article class="movie-card">
            <div class="poster" aria-hidden="true">
                <img alt="movie poster image" src="${movieData.Poster}"/>
            </div>
            <div class="movie-card__body">
                <div class="movie-card__title">
                    <h2>${movieData.Title}</h2>
                    <span class="movie-card__rating">${movieData.Ratings ? movieData.Ratings.map((rating) => `${rating.Source}: ${rating.Value}`).join(" | ") : movieData.imdbRating}</span>
                </div>
                <div class="movie-card__meta">
                    <span>${movieData.Runtime}</span>
                    <span>${movieData.Genre}</span>
                    <button class="action action--add" type="button" onclick='addToLocalList(${JSON.stringify(movieData)})'>
                        <span class="action__icon">+</span>
                        Watchlist
                    </button>
                </div>
                <p>${movieData.Plot}</p>
            </div>
        </article>
    `;
}

searchBtnEl.addEventListener("click", async () => {
    const userInput = userInputEl.value.trim();
    if (!userInput) return;
    try {
        const res = await fetch(`${apiUrl}s=${userInput}`);
        if (!res.ok) throw new Error("api error please try again later");
        const dataArray = await res.json();
        if (dataArray.Response === "False") {
            movieListEl.innerHTML =
                "<h1 style = 'text-align: center'>No Movies Found</h1>";
            throw new Error("no movies found");
        }
        dataArray.Search.map(async (movie) => {
            try {
                const res = await fetch(`${apiUrl}t=${movie.Title}`);
                if (!res.ok)
                    throw new Error("api error please try again later");
                const movieData = await res.json();
                const movieCard = createMovieCard(movieData);
                movieListEl.innerHTML += movieCard;
            } catch (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error(error);
    }
});
