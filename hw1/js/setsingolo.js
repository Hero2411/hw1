const prev = document.getElementById("prev")
const next = document.getElementById("next")

prev.addEventListener("click", prevSet)
next.addEventListener("click", nextSet)

const likebutton = document.getElementById("like-button")
const sendrating = document.getElementById("rating_input_btn")
const rating_input = document.getElementById("rating_input")
const sendcomment = document.getElementById("comment_input_btn")
const comment_input = document.getElementById("comment_input")

likebutton.addEventListener("click", setLike)
sendrating.addEventListener("click", setRating)
sendcomment.addEventListener("click", sendComment)

var currentImage = -1




async function getSetData() {
    if (set_id == 0) {
        alert("No Set provided, redirecting to home...");
        window.location.href = "hw1.php"
    }
    const response = await fetch(`./backend/fetch_set.php?id=${set_id}`);
    var jsonData = await response.json();
    if (jsonData["data"] == undefined) {
        alert(`Unable to get Set due to: ${jsonData["error"]}`)
        window.location.href = "hw1.php"
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
    loadImageData(event.target.dataset.id)
}

async function loadImageData(img_id) {
    currentImage = img_id;
    const response = await fetch(`./backend/fetch_image_data.php?id=${img_id}`);
    var jsonData = await response.json();
    if (jsonData["data"] == undefined) {
        alert(`Unable to get image data due to: ${jsonData["error"]}`)
    }
    else {
        jsonData = jsonData["data"]
    }
    rating = document.getElementById("rating")
    rating.innerHTML = `${parseFloat(jsonData["avg_rating"])} out of 5 ⭐`
    comments = document.getElementById("comments")
    comments.innerHTML = ""
    jsonData["comments"].forEach(element => {
        const comment = document.createElement("div")
        comment.classList.add("comment")

        const comment_header = document.createElement("div")
        comment_header.classList.add("comment-header")

        const author = document.createElement("h3")
        author.classList.add("comment-author")
        author.innerHTML = `${element['username']}`
        const comment_date = document.createElement("p")
        comment_date.classList.add("comment-date")
        comment_date.innerHTML = `${element['comment_date']}`
        
        
        const comment_text = document.createElement("p")
        comment_text.innerHTML = element["comment_text"]

        comment_header.appendChild(author);
        comment_header.appendChild(comment_date);

        comment.appendChild(comment_header);
        comment.appendChild(comment_text)
        comments.appendChild(comment);
    }
    );
}

function nextSet() {
    set_id += 1
    window.history.pushState('next_set', 'Set', './setsingolo.php?id=' + set_id);
    getSetData()
}

function prevSet() {
    if ((set_id - 1) == 0) {
        return
    }
    set_id -= 1
    window.history.pushState('prev_set', 'Set', './setsingolo.php?id=' + set_id);
    getSetData()
}

getSetData()

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 425) {
        prev.style.display = 'none';
        next.style.display = 'none';
    }
    else {
        prev.style.display = 'block';
        next.style.display = 'block';
    }
});

async function setLike() {
    const response = await fetch(`./backend/like.php?image_id=${currentImage}&token=${getCookie("token")}`);
    var jsonData = await response.json();
    if (jsonData["data"] == undefined) {
        alert(`Unable to like image due to: ${jsonData["error"]}`)
    }
    else {
        alert("Liked successfull")
    }
}

async function setRating() {
    var num_rating = rating_input.value;
    if (num_rating <= 0 ||num_rating >5) {
        alert(`Invalid rating value`)
        return
    }
    const response = await fetch(`./backend/rating.php?image_id=${currentImage}&token=${getCookie("token")}&rate=${num_rating}`);
    var jsonData = await response.json();
    if (jsonData["data"] == undefined) {
        alert(`Unable to rate image due to: ${jsonData["error"]}`)
    }
    else {
        alert(`${jsonData["data"]}`)
    }
    loadImageData(currentImage);
}

async function sendComment() {
    var comment = comment_input.value;
    if (comment == "" || comment.match(/^ +$/g)) {
        alert(`Invalid comment`)
        return
    }
    const response = await fetch(`./backend/comment.php?image_id=${currentImage}&token=${getCookie("token")}&comment=${comment}`);
    var jsonData = await response.json();
    if (jsonData["data"] == undefined) {
        alert(`Unable to rate image due to: ${jsonData["error"]}`)
    }
    else {
        alert(`${jsonData["data"]}`)
    }
    loadImageData(currentImage);
}