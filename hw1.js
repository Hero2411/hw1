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
