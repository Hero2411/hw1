const searchbtn = document.getElementById("search_button");
const searchfield = document.getElementById("searchInput")

searchbtn.addEventListener('click', search);

function search() {
    getFeaturedSets("containerset", "", searchfield.value)
}

getFeaturedSets("containerset")

