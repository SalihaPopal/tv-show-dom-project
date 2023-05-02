//You can edit ALL of the code here
const node = document.createElement("li");
const nodeText = document.createTextNode("episode's name");
node.appendChild(nodeText);
document.getElementById("root").appendChild(node);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
 
  
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
