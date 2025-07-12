const quoteContainer = document.getElementById ('quote-container');
const quoteText = document.getElementById ('quote');
const authorText = document.getElementById ('author');
const twitterBtn = document.getElementById ('twitter');
const newQuoteBtn = document.getElementById ('new-quote');
const loader = document.getElementById ('loader'); 

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true; 
}

// Hide loading 
function complete () {
    quoteContainer.hidden = false; 
    loader.hidden = true; 
}

// Show New Quote
function newQuote() {
    
    // Pick a random quote from apiQuotes array 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   // check if Author field is blank and replace with quote unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
    authorText.textContent = quote.author;
    }
//Check quote length to determine styling 
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
    quoteText.classList.remove('long-quote');
    }
    // Set quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get  quotes from API 
async function  getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch (apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}


// tweet quote 
function tweetQuote () {
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, 'blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
getQuotes(); 

