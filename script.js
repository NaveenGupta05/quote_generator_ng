"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");
let getQuotes = [];

// Show Loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loader
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// show New Quote
function showQuote() {
  loading();
  // const randomQuote = (max, min) => {
  //   return Math.round(Math.random() * (max - min) + 1) + min;
  // };
  // const getRandomQuote = randomQuote(-1, 8261);

  // Pick a random quote from quoteAPI
  const quotes = getQuotes[Math.floor(Math.random() * getQuotes.length)];

  // Check if author field is blank, if yes, then replace it with Anonymous
  if (!quotes.author) quoteAuthor.textContent = "Anonymous";
  else quoteAuthor.textContent = quotes.author;

  // Check quote lenght to determine styling
  if (quotes.text.length > 120) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");
  // Set quote, hide loader
  quoteText.textContent = quotes.text;
  complete();
}

// Get API Quote
async function getApiQuotes() {
  loading();
  try {
    const response = await fetch(
      "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    );
    getQuotes = await response.json();
    showQuote();
  } catch (err) {
    console.log(err);
  }
}

// Tweet Quote
function tweetQuote() {
  const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(tweetURL, "_blank");
}

// Add Event Listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", showQuote);

getApiQuotes();
