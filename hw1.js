const quote_url = "https://api.quotable.io/quotes/random?tags=philosophy&maxLength=100"



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
