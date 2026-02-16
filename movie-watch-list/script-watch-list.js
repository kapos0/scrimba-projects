const listEl = document.getElementById("movie-list");
const list = [];

function removeMovie(movieId) {
    localStorage.removeItem(movieId);
    window.location.href = "/watch-list.html";
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
                    <button class="action action--remove" type="button" onclick='removeMovie(${JSON.stringify(movieData.imdbID)})'>
                        <span class="action__icon">-</span>
                        Remove
                    </button>
                </div>
                <p>${movieData.Plot}</p>
            </div>
        </article>
    `;
}

function getLocalList() {
    for (let i = 0; i < localStorage.length; i++) {
        // set iteration key name
        const key = localStorage.key(i);
        // use key name to retrieve the corresponding value
        const value = localStorage.getItem(key);
        list.push(JSON.parse(value));
    }
    list.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        listEl.innerHTML += movieCard;
    });
}

getLocalList();
