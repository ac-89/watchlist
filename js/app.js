//Example fetch using pokemonapi.co
document.querySelector("button").addEventListener("click", getFetch);
document
  .querySelector(".randomMovie")
  .addEventListener("click", getRandomMovie);

function getFetch() {
  const choice = document.querySelector("input").value;
  const url = "https://imdb-api.com/en/API/SearchMovie/k_9r4o6m00/" + choice;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data.results);
      const results = data.results;
      genUI(results);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function genUI(results) {
  const movieArea = document.querySelector(".movie_area");
  movieArea.innerHTML = "";
  results.forEach((result) => {
    const movieCard = document.createElement("div");
    const movieTitle = document.createElement("h2");
    movieTitle.innerText = result.title;
    const movieDesc = document.createElement("p");
    movieDesc.innerText = result.description;
    const posterImg = document.createElement("img");
    posterImg.src = result.image;
    const addBtn = document.createElement("button");
    addBtn.classList.add("add_btn");
    addBtn.innerText = "click";
    addBtn.addEventListener("click", () => {
      localStorage.setItem(result.title, result.id);
    });
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(movieDesc);
    movieCard.appendChild(posterImg);
    movieCard.appendChild(addBtn);
    movieArea.appendChild(movieCard);
  });
}

function getRandomMovie() {
  let rand = Math.floor(Math.random() * localStorage.length - 1);
  let movie = localStorage.getItem(localStorage.key(rand));
  console.log(movie);
  fetch(`https://imdb-api.com/en/API/SearchMovie/k_9r4o6m00/` + movie)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data.results);
      const results = data.results;
      genUI(results);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
// for (var i = 0; i < localStorage.length; i++) {
//   document
//     .querySelector(".movie_area")
//     .append(
//       (document.createElement("img").src = localStorage.getItem(
//         localStorage.key(i)
//       ))
//     );
// }
