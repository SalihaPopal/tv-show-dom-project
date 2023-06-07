const allEpisodes = getAllEpisodes();

// function setup() {
//     // const allEpisodes = getAllEpisodes();
//     makePageForEpisodes(allEpisodes);
//     buildDropdown(allEpisodes);
//   }


//.  level 350

// async function setup() {
//     try {
//       const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
//       const episodes = await response.json();
//       makePageForEpisodes(episodes);
//       buildDropdown(episodes);
//     } catch (error) {
//       console.error("Error fetching episodes:", error);
//     }
//   }
  

// level 400

async function setup() {
    try {
      const episodes = await getAllEpisodes();
      makePageForEpisodes(episodes);
      buildDropdown(episodes);
      buildEpisodeDropdown(episodes);
      makePageForShows(allShows);
    } 
    catch (error) {
      console.error("Error fetching shows:", error);
    }
  }
 
  function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    rootElem.textContent = `Displaying ${episodeList.length}/${allEpisodes.length} episodes`;
    
   
    // Added grid
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    rootElem.appendChild(gridContainer);
  
    episodeList.forEach((episode) => {
      const episodeElem = document.createElement("div");
      episodeElem.classList.add("grid-item");
  
      // Set the episode code
      const season = episode.season.toString().padStart(2, "0");
      const number = episode.number.toString().padStart(2, "0");
      const episodeCode = `S${season}E${number}`;
  
      // Create the episode content
      const nameElem = document.createElement("h3");
      nameElem.textContent = `${episode.name} - ${episodeCode}`;

      const episodeLink = document.createElement("a");
      episodeLink.href = episode.url;
      // episodeLink.textContent = episode.name;
      nameElem.appendChild(episodeLink);
      
  
      const imageElem = document.createElement("img");
      imageElem.src = episode.image.medium;
      imageElem.alt = episode.name;
      imageElem.classList.add("img");
  
      const summaryElem = document.createElement("p");
      summaryElem.innerHTML = episode.summary;
      summaryElem.classList.add("p");
  
      // Add the content to the episode element
      episodeElem.appendChild(nameElem);
      episodeElem.appendChild(imageElem);
      episodeElem.appendChild(summaryElem);
      gridContainer.appendChild(episodeElem);
    });
} ;



// live search for the selected episodes

const liveSearch = document.getElementById("searchInput");
liveSearch.addEventListener("keyup", searchEpisode); // keyup actives the live search

 //  selecting a specific episode
 function searchEpisode(event) {
  const selectedEpisode = [];  
  let searchContent = event.target.value;
  if (searchContent === "") {
    setup();
  } 
  else 
  {
    let insensitiveSearch = new RegExp(searchContent, "i");
    allEpisodes.forEach((episode) => {
      if (episode.name.match(insensitiveSearch) !== null || episode.summary.match(insensitiveSearch) !== null) {
        selectedEpisode.push(episode);
      }
    });
    makePageForEpisodes(selectedEpisode);

    const selector = document.getElementById("episode-selector");
    if (selector.value !== "allEpisodes") {
      scrollToEpisode(selector.value.target);
    }
  }
}



// level 300 dropdown list of episodes
function buildEpisodeDropdown(episodes) {
    const selector = document.getElementById("episode-selector");
  
    episodes.forEach((episode) => {
      const season = episode.season.toString().padStart(2, "0");
      const number = episode.number.toString().padStart(2, "0");
      const episodeCode = `S${season}E${number}`;
      const option = document.createElement("option");
      option.value = episodeCode;
      option.textContent = `${episodeCode} - ${episode.name}`;
      selector.appendChild(option);
    });

    selector.addEventListener("change", (event) => {
      const selectedEpisodeCode = event.target.value;
      const selectedEpisode = episodes.find((episode) => {
        const season = episode.season.toString().padStart(2, "0");
        const number = episode.number.toString().padStart(2, "0");
        const episodeCode = `S${season}E${number}`;
        return episodeCode === selectedEpisodeCode;
      });
  
      if (selectedEpisode) {                 
        makePageForEpisodes([selectedEpisode]);
      } else {
        makePageForEpisodes(episodes);
      }
    });
  }
   
//.  level 400 adding a new episode selector

function buildDropdown(){
    const showSelector = document.getElementById("show-selector");

    // Load the list of shows
    const shows = getAllShows();

    // Sort shows alphabetically
    shows.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
  
    shows.forEach((show) => {
      const option = document.createElement("option");
      option.value = show.id;
      option.textContent = show.name;
      showSelector.appendChild(option); 
    });
  
    showSelector.addEventListener("change", async (event) => {
      const selectedShowId = event.target.value;
      const episodes = await fetchEpisodesForShow(selectedShowId);
      // makePageForEpisodes(episodes);
      buildDropdown(episodes); // Rebuild the episode selector dropdown with the new episodes
    });
  }
  
  async function fetchEpisodesForShow(showId) {
    const url = `https://api.tvmaze.com/shows/${showId}/episodes`;
    const response = await fetch(url);
    const episodes = await response.json();
    return episodes;
  }
  
  
 // level 500 
const allShows = getAllShows(); // Assuming you have a function to get all shows


function makePageForShows(showList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; // Clear the existing content

  showList.forEach((show) => {
    const showElem = document.createElement("div");
    showElem.classList.add("show-container");
  
    const nameElem = document.createElement("h3");
    nameElem.textContent = show.name;
    nameElem.classList.add("show-name");
    nameElem.classList.add("name-elem");

    const imageElem = document.createElement("img");
    imageElem.src = show.image !==null? show.image.medium : "";
    imageElem.alt = show.name;
    imageElem.classList.add("show-image");
  
    const summaryElem = document.createElement("p");
    summaryElem.innerHTML = show.summary;
    summaryElem.classList.add("show-summary");

    const showInfoElem = document.createElement("div");
    showInfoElem.classList.add("show-info");

    const genresElem = document.createElement("p");
    genresElem.textContent = `Genres: ${show.genres.join(", ")}`;

    const statusElem = document.createElement("p");
    statusElem.textContent = `Status: ${show.status}`;

    const ratingElem = document.createElement("p");
    ratingElem.textContent = `Rating: ${show.rating.average}`;

    const runtimeElem = document.createElement("p");
    runtimeElem.textContent = `Runtime: ${show.runtime} minutes`;

    showInfoElem.appendChild(genresElem);
    showInfoElem.appendChild(statusElem);
    showInfoElem.appendChild(ratingElem);
    showInfoElem.appendChild(runtimeElem);

    showElem.appendChild(nameElem);
    showElem.appendChild(summaryElem);
    showElem.appendChild(imageElem);
    showElem.appendChild(showInfoElem);

    rootElem.appendChild(showElem);
    
    nameElem.addEventListener("click", () => {
      fetchAndPresentEpisodes(show.id);
      hideShowsListing();
    });
  });
}



// Call the function to display all shows when the app starts
makePageForShows(allShows);

const url = "https://api.tvmaze.com/shows"

// fetch data from outside API

function takeToShow(show) {

  const url = "https://api.example.com/shows/${showId}/episodes"
  
  const showId = show.id; // Assuming each show object has an "id" property

  // Fetch and present episodes from the selected show
  fetch(url)
    .then((episodes) => {
      // makePageForEpisodes(episodes);
      makePageForShows(showList);
    })
    .catch((error) => {
      console.error("Error fetching episodes:", error);
    });

  // Hide the "shows listing" view
  const showsListingView = document.getElementById("showsListingView");
  showsListingView.style.display = "none";
}

async function fetchAndPresentEpisodes(showId) {
  try {
    const episodes = await fetchEpisodesForShow(showId);
    makePageForEpisodes(episodes);
    buildDropdown(episodes);
  } catch (error) {
    console.error("Error fetching episodes:", error);
  }
}

function hideShowsListing() {
  const showsListingElem = document.getElementById("shows-listing");
  // showsListingElem.style.display = "none";
}

function addNavigationLink() {
  const rootElem = document.getElementById("root");
  const navigationLink = document.createElement("a");
  navigationLink.href = "url";
  navigationLink.textContent = "Back to Shows Listing";
  navigationLink.addEventListener("click", () => {
    showShowsListing();
    hideEpisodesListing();
  });
  rootElem.insertBefore(navigationLink, rootElem.firstChild);
}

function showShowsListing() {
  const showsListingElem = document.getElementById("shows-listing");
  showsListingElem.style.display = "block";
}

function hideEpisodesListing() {
  const episodesListingElem = document.getElementById("episodes-listing");
  episodesListingElem.style.display = "none";
}
