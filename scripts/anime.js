const base_url = "https://api.jikan.moe/v4";

function searchAnime(event) {
  event.preventDefault();

  const form = new FormData(this);
  const query = form.get("search");

  fetch(`${base_url}/anime?q=${query}&page=1`)
    .then((res) => res.json())
    .then(updateDom)
    .catch((err) => console.warn(err.message));
}

function updateDom(data) {
  console.log(data);

  const searchResults = document.getElementById("search-results");

  const animeByCategories = data.data.reduce((acc, anime) => {
    const { type } = anime;
    if (acc[type] === undefined) acc[type] = [];
    acc[type].push(anime);
    return acc;
  }, {});

  searchResults.innerHTML = Object.keys(animeByCategories)
    .map((key) => {
      const animesHTML = animeByCategories[key]
        .sort((a, b) => a.episodes - b.episodes)
        .map((anime) => {
          return `
          <div class="card">
          <div class="anime__img">
            <a href="${anime.url}">
              <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            </a>
          </div>
          <div class="card-content">
            <h5 class="card-title">${anime.title}</h5>
          </div>
        </div>
        
                `;
        })
        .join("");

      return `
                <section>
                    <div class="k-row">${animesHTML}</div>
                </section>
            `;
    })
    .join("");
}

function pageLoaded() {
  const form = document.getElementById("search_form");
  form.addEventListener("submit", searchAnime);
}

window.addEventListener("load", pageLoaded);


