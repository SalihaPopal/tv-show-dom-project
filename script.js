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
      buildEpisodeDropdown(episodes)
      makePageForEpisodes(shows);
    } catch (error) {
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
    //   episodeLink.textContent = episode.name;
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
  
      // Add the episode element to the grid container
      gridContainer.appendChild(episodeElem);
    });
} ;



// live search for the selected episodes

const liveSearch = document.getElementById("searchInput");
liveSearch.addEventListener("keyup", searchEpisode); // keyup active the the live search

   function searchEpisode(event) {

    const selectedEpisode = [];

    let searchContent = event.target.value;
   if (searchContent === ""){
    setup()
   }
   else
   {
    let insensitiveSearch = new RegExp(searchContent, "i"); // regular statement for setting some rules to match the search content
    allEpisodes.forEach((episode) => {
        if(
            episode.name.match(insensitiveSearch) !== null ||
            episode.summary.match(insensitiveSearch) !== null
            ) {
                selectedEpisode.push(episode);   
        }
    })
    makePageForEpisodes(selectedEpisode);
  
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

  function scrollToEpisode(episodeCode) {
    const episodeElem = document.querySelector(`.grid-item h3:contains(${episodeCode})`).parentNode;
    episodeElem.scrollIntoView({ behavior: "smooth" });
  }

  //  selecting a specific episode
  function searchEpisode(event) {
    const selectedEpisode = [];
  
    let searchContent = event.target.value;
    if (searchContent === "") {
      setup();
    } else {
      let insensitiveSearch = new RegExp(searchContent, "i");
      allEpisodes.forEach((episode) => {
        if (episode.name.match(insensitiveSearch) !== null || episode.summary.match(insensitiveSearch) !== null) {
          selectedEpisode.push(episode);
        }
      });
      makePageForEpisodes(selectedEpisode);
  
      const selector = document.getElementById("episode-selector");
      if (selector.value !== "allEpisodes") {
        scrollToEpisode(selector.value);
      }
    }
  }


   
//.  level 400 adding a new episode selector

function buildDropdown(episodes){
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
      makePageForEpisodes(episodes);
      buildDropdown(episodes); // Rebuild the episode selector dropdown with the new episodes
    });
  }
  
  async function fetchEpisodesForShow(showId) {
    const url = `https://api.tvmaze.com/shows/${showId}/episodes`;
    const response = await fetch(url);
    const episodes = await response.json();
    return episodes;
  }
  
  window.onload = async function () {
    const initialShowId = 'i'; 
    const episodes = await fetchEpisodesForShow(initialShowId);
    setup();
    buildDropdown(episodes);
  };
  
  
  window.onload = setup
