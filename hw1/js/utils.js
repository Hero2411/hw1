const UPButton = document.querySelector('#upbtn');
const MenuButton = document.querySelector('#menubtn');
const MenuCloseButton = document.querySelector('#menux');
const Nav = document.querySelector('nav');


UPButton.addEventListener('click', topFunction);
MenuButton.addEventListener('click', hammenu);
MenuCloseButton.addEventListener('click', dishammenu);

async function getFeaturedSets(container_id, limit, search) {
    limit = limit ? `&limit=${limit}` : ""
    search = search ? `&search=${search}` : ""
    console.log(`./backend/fetch_sets.php?${limit}${search}`)
    const response = await fetch(`./backend/fetch_sets.php?${limit}${search}`);
    const jsonData = await response.json();
    container = document.getElementById(container_id)
    container.innerHTML = ""
    if (jsonData["data"] == undefined) {
        alert(`Unable to load featured sets due to: ${jsonData["error"]}`)
        return
    }
    jsonData["data"].forEach(element => {
        const card = document.createElement("div");
        card.classList.add("card");
        const banner = document.createElement("img");
        banner.src = `./immagini/covers/${element["cover_filename"]}`;
        const text_div = document.createElement("div")
        text_div.id = "cardtext"
        const title = document.createElement("h3")
        title.innerHTML = element['title'];
        const description = document.createElement("p");
        description.innerHTML = element["description"];
        text_div.appendChild(title);
        text_div.appendChild(description);
        card.appendChild(banner);
        card.appendChild(text_div);
        container.appendChild(card);
        card.addEventListener("click", () => {
            window.location.href = `setsingolo.php?id=${element["id"]}`
        })
    }
    );
  }

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function hammenu() {
    MenuButton.style.display = 'none';
    MenuCloseButton.style.display = 'block';
    Nav.style.display = "flex";
    UPButton.style.display = 'none';

}

function dishammenu() {
    MenuButton.style.display = 'block';
    MenuCloseButton.style.display = 'none';
    Nav.style.display = "none";
    UPButton.style.display = 'block';
}