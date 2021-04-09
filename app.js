// Object storing all the cards
let cards = {
  age1: [],
  age2: [],
  age3: [],
  age4: [],
};

// Amount of cards in every age
let cardsInAge = {
  1: 32,
  2: 38,
  3: 39,
  4: 39,
};

// Settings Variables
let water = false;

// Card variables
let randomAge;
let randomAgeString;
let totalCards;
let randomCard;

// Water Input Onclick
$("#water").on("change", () => {
  if ($("#water:checked").val() === "on") water = true;
  else water = false;
});

// Generate Card Function
const generateCard = () => {
  randomAge = Math.floor(Math.random() * 4 + 1);
  randomTier = Math.floor(Math.random() * 3 + 1);
  randomAgePath = `age-${randomAge}`;
  if (water) {
    randomAgePath += "/water";
  } else {
    randomAgePath += "/land";
    randomAgePath += `/tier-${randomTier}`;
  }

  totalCards = cardsInAge[randomAge];
  randomCard = Math.floor(Math.random() * totalCards + 1);

  if (
    cards[`age${randomAge}`].find((e) => e === randomCard) ||
    cards[`age${randomAge}`].length > 10
  ) {
    generateCard();
  } else {
    cards[`age${randomAge}`].push(randomAgePath);
  }
};

// Generate Deck Function
const generateDeck = () => {
  // Clear Arrays for each Age
  for (let i = 1; i <= 4; i++) {
    cards[`age${i}`] = [];
  }

  // Generate 25 random Cards
  for (let i = 0; i < 25; i++) {
    generateCard();
  }
};

// Add Cards to DOM
const addToContainer = () => {
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`age${i}`).innerHTML = "";
    cards[`age${i}`].forEach((card) => {
      let cardElem = document.createElement("img");
      cardElem.src = `img/${card}.png`;
      document.getElementById(`age${i}`).appendChild(cardElem);
    });
  }
};

// Generate-Deck click-handler
$("#generate-deck").on("click", () => {
  generateDeck();
  addToContainer();
});
