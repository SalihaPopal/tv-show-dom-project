const allEpisodes = getAllEpisodes();
function setup() {
    // const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
    buildDropdown(allEpisodes);
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
      nameElem.appendChild(episodeLink);
      
  
      const imageElem = document.createElement("img");
      imageElem.src = episode.image.medium;
      imageElem.alt = episode.name;
  
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

// dropdown list of episodes

function buildDropdown(episodes) {
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
   

window.onload = setup;







