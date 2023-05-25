const prev = document.getElementById("prev")
const next = document.getElementById("next")

prev.addEventListener("click", prevSet)
next.addEventListener("click", nextSet)

async function getSetData() {
    if (set_id == 0) {
        alert("No Set provided, redirecting to home...");
        window.location.href="hw1.php"
    }
    const response = await fetch(`./backend/fetch_set.php?id=${set_id}`);
    var jsonData = await response.json();
    if (jsonData["data"] == undefined) {
        alert(`Unable to get Set due to: ${jsonData["error"]}`)
        window.location.href="hw1.php"
    }
    else {
        jsonData = jsonData["data"]
    }
    title_container = document.getElementById("titleimg")
    title_container.innerHTML = ""
    const banner = document.createElement("img");
    banner.src = `./immagini/covers/${jsonData["cover_filename"]}`;
    const setpageintrotext_div = document.createElement("div");
    setpageintrotext_div.innerHTML = ""
    setpageintrotext_div.id = "setpageintrotext"
    const title = document.createElement("h1")
    title.innerHTML = jsonData['title'];
    const description = document.createElement("p");
    description.innerHTML = jsonData["description"];
    const location = document.createElement("p");
    location.innerHTML = jsonData["location"];
    const date_shoot = document.createElement("p");
    date_shoot.innerHTML = jsonData["shoot_date"];
    const subject = document.createElement("p");
    subject.innerHTML = jsonData["subject"];
    setpageintrotext_div.appendChild(title);
    setpageintrotext_div.appendChild(description);
    setpageintrotext_div.appendChild(location);
    setpageintrotext_div.appendChild(date_shoot);
    setpageintrotext_div.appendChild(subject);
    title_container.appendChild(banner);
    title_container.appendChild(setpageintrotext_div);
    const image_gallery = document.getElementsByClassName("grid")[0];
    image_gallery.innerHTML = ""
    jsonData["images"].forEach(element => {
        const image_div = document.createElement("div")
        image_div.classList.add("item")
        const img = document.createElement("img")
        img.src = `./immagini/photos/${element["filename"]}`
        img.dataset.id = element['id']
        img.addEventListener("click", onClickGetImageData)
        image_div.appendChild(img);
        image_gallery.appendChild(image_div);
    }
    );
  }

  async function onClickGetImageData(event) {
    img_id = event.target.dataset.id;
    const response = await fetch(`./backend/fetch_image_data.php?id=${img_id}`);
    var jsonData = await response.json();
    if (jsonData["data"] == undefined) {
        alert(`Unable to get image data due to: ${jsonData["error"]}`)
    }
    else {
        jsonData = jsonData["data"]
    }
    rating = document.getElementById("rating")
    rating.innerHTML = jsonData["avg_rating"]
    comments = document.getElementById("comments")
    comments.innerHTML = ""
    jsonData["comments"].forEach(element => {
        const comment = document.createElement("p")
        comment.innerHTML = element["comment_text"]
        comments.appendChild(comment);
    }
    );
  }

  function nextSet() {
    set_id+=1
    getSetData()
  }

  function prevSet() {
    if ((set_id - 1) == 0) {
        return
    }
    set_id-=1
    getSetData()
  }

  getSetData()
