document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const animeName = document.getElementById('animeNameInput').value;
  const response = await fetch('/.netlify/functions/scrapeEpisodeLinks', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ animeName }),
  });

  const episodeLinks = await response.json();

  let linksDisplay = document.createElement('div');
  linksDisplay.innerText = JSON.stringify(episodeLinks);
  document.getElementById('linksList').appendChild(linksDisplay);
});