const quote_url = "https://api.quotable.io/quotes/random?tags=philosophy&maxLength=100"
const refreshImg = document.getElementById("refresh_images")
refreshImg.addEventListener("click", getRandomPhotos)




async function load_quote() {
    const response = await fetch(quote_url, {
        method: 'GET',
    });
    const data = await response.json();
    const quote = document.querySelector('#random_quote');
    quote.innerHTML = data[0]["content"];
}

async function getRandomPhotos() {
    const response = await fetch(`./backend/fetch_random_images.php`);
    const jsonData = await response.json();
    if (jsonData["data"] == undefined) {
        alert(`Unable to get random photos due to: ${jsonData["error"]}`)
        return
    }
    container = document.getElementsByClassName("grid")[0]
    container.innerHTML = ""
    jsonData["data"].forEach(element => {
        const image_div = document.createElement("div");
        image_div.classList.add("item");
        const image = document.createElement("img");
        image.src = `./immagini/photos/${element["filename"]}`;
        image.alt = element["alt_text"];
        image_div.appendChild(image);
        container.appendChild(image_div);
    }
    );
  }



load_quote()
getFeaturedSets("cardbody", 3)
getRandomPhotos()

