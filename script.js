function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.classList.add("grid-container");

  episodeList.forEach((episode) => {
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("grid-item");
  
    // set the episode code
    const season = episode.season.toString().padStart(2, "0");
    const number = episode.number.toString().padStart(2, "0");
    const episodeCode = `S${season}E${number}`;

    // create the episode content
    const nameElem = `<h2>${episode.name} - ${episodeCode}</h2>`;

    const imageElem = `<img src="${episode.image.medium}" alt="${episode.name}" />`;
    

    const summaryElem = `<p>${episode.summary}</p>`;

    // const linkElem = `<a href="${episode.url}">View on TVMaze.com</a>`;
    // episodeElem.innerHTML = `${nameElem}${imageElem}${summaryElem}${linkElem}`;

    // add the content to the episode element
    episodeElem.innerHTML = `${nameElem}${imageElem}${summaryElem}`;

    // add the episode element to the root element
    rootElem.appendChild(episodeElem);
  });
}

window.onload = setup;
