document.addEventListener("DOMContentLoaded", function () {
  const apiKeyInput = document.getElementById("apiKey");
  const movieTitleInput = document.getElementById("movieTitle");
  const searchButton = document.getElementById("searchButton");
  const loader = document.getElementById("loader");
  const results = document.getElementById("results");

  searchButton.addEventListener("click", function () {
    const apiKey = apiKeyInput.value.trim();
    const movieTitle = movieTitleInput.value.trim();

    if (!apiKey || !movieTitle) {
      alert("Please enter both API Key and movie title.");
      return;
    }

    loader.style.display = "block";
    results.innerHTML = "";

    fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        loader.style.display = "none";
        let resultNo = 1;
        if (data.Response === "True") {
          data.Search.forEach((movie) => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.Poster === 'N/A' ? 'https://amit8127.github.io/Frontend-3-Contest-1-September/Assets/posterNA.jpg' : movie.Poster}" alt="${movie.Title} Poster">
                <h2><span>${resultNo}</span>${movie.Title}</h2>
                `;
            results.appendChild(movieCard);
            resultNo++;
          });
        } else {
          results.innerHTML = `<h3>Invalid API Key! or Data is not Present!</h3>`;
        }
      })
      .catch((error) => {
        loader.style.display = "none";
        console.error(error);
        alert("An error occurred while fetching data.");
      });
  });
});
