const quote_url = "https://api.quotable.io/quotes/random?tags=philosophy&maxLength=100"
const UPButton = document.querySelector('#upbtn');
const MenuButton = document.querySelector('#menubtn');
const MenuCloseButton = document.querySelector('#menux');
const Nav = document.querySelector('nav');
const Set_ = document.querySelector('.card')


UPButton.addEventListener('click', topFunction);
MenuButton.addEventListener('click', hammenu);
MenuCloseButton.addEventListener('click', dishammenu);
Set_.addEventListener('click', goset);

function hammenu() {
    MenuButton.style.display = 'none';
    MenuCloseButton.style.display = 'block';
    Nav.style.display = "flex";
    UPButton.style.zIndex = '0';

}

function dishammenu() {
    MenuButton.style.display = 'block';
    MenuCloseButton.style.display = 'none';
    Nav.style.display = "none";
    UPButton.style.zIndex = '1';
}

function goset() {
    window.open("setnatura.html");
}

async function load_quote() {
    const response = await fetch(quote_url, {
        method: 'GET',
    });
    const data = await response.json();
    const quote = document.querySelector('#random_quote');
    console.log(data)
    quote.innerHTML = data[0]["content"];
}
load_quote()

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

var searchForm = document.querySelector('#ricerca');
var searchInput = document.querySelector('#searchInput');

var cards = [
    {
        imageSrc: "immagini/holdcard.jpeg",
        title: "Natura",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel augue libero. Sed ut massa vitae tellus varius aliquam.",
        natureType: "Foresta"
    },
    {
        imageSrc: "immagini/holdcard2.jpeg",
        title: "Montagne",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel augue libero. Sed ut massa vitae tellus varius aliquam.",
        natureType: "Montagna"
    },
    
];

function searchCards(query) {
    // Filtra l'array cards in base alla proprietà natureType
    var filteredCards = cards.filter(function (card) {
        return card.title.toLowerCase() === query.toLowerCase();
    });

     // Stampa i titoli delle carte filtrate sulla console
     filteredCards.forEach(function(card) {
        console.log(card.title);
    });
}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var query = searchInput.value;
    searchCards(query);
});

searchInput.addEventListener('input', function () {
    var query = searchInput.value;
    searchCards(query);
});



function displayCards(cards) {
 
    var resDiv = document.querySelector('#res');

    resDiv.innerHTML = '';

    cards.forEach(function (card) {
        // Crea elementi HTML per ogni carta
        var cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        var img = document.createElement('img');
        img.src = card.imageSrc;
        cardDiv.appendChild(img);

        var cardTextDiv = document.createElement('div');
        cardTextDiv.id = 'cardtext';

        var title = document.createElement('h3');
        title.textContent = card.title;
        cardTextDiv.appendChild(title);

        var description = document.createElement('p');
        description.textContent = card.description;
        cardTextDiv.appendChild(description);

        cardDiv.appendChild(cardTextDiv);

        // Aggiungi la carta al div "res"
        resDiv.appendChild(cardDiv);
    });
}




