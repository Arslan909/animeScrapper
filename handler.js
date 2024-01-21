const { Builder, By, Key, until } = require('selenium-webdriver');
const chromeBrowser = require('selenium-webdriver/chrome');

async function scrapeEpisodeLinks(animeName) {
    let options = new chromeBrowser.Options()
    // options.headless() // headless mode
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();


    formatted_name = animeName.replace(" ", "%20")
    search_url = `https://9animetv.to/search?keyword=${formatted_name}`


    await driver.get(search_url)
    let anime_link = driver.findElement(By.css(`a.dynamic-name[title="${animeName}"]`)).getAttribute('href');
    let animeUrl = anime_link

    await driver.get(animeUrl)

    let episodeLinkElements = await driver.findElements(By.css('a.item.ep-item'));


    let episodeLinks = []
    for(let elements of episodeLinkElements){
        let href = await elements.getAttribute('href')
        episodeLinks.push(href)
    }

    console.log(episodeLinks)
    await driver.quit();

    let linksDisplay = document.createElement('div')

    linksDisplay.innerText = episodeLinks

    document.getElementById("linksList").appendChild(linksDisplay)
}

module.exports = { scrapeEpisodeLinks }