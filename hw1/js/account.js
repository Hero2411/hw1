const name_display = document.getElementById("username")
async function getUserData(token) {
    const response = await fetch(`./backend/fetch_user.php?token=${token}`);
    
    var jsonData = await response.json();
    if (jsonData["data"] == undefined) {
        alert(`Unable to get User due to: ${jsonData["error"]}`)
        window.location.href = "hw1.php"
    }
    else {
        jsonData = jsonData["data"]
    }
    const image_gallery = document.getElementsByClassName("grid")[0];
    name_display.innerHTML = jsonData["username"]
    jsonData["images"].forEach(element => {
        const image_div = document.createElement("div")
        image_div.classList.add("item")
        const img = document.createElement("img")
        img.src = `./immagini/photos/${element["filename"]}`
        img.dataset.id = element['id']
        image_div.appendChild(img);
        image_gallery.appendChild(image_div);
    }
    );
}

if (getCookie("token") != "") {
    getUserData(getCookie("token"))
} else {
    alert("Not logged in, route error!");
    window.location.href = "./hw1.php";
}