const suits = ["♠", "♥", "♦", "♣"];
const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];
const suitNames = {
    "♠": "spades",
    "♥": "hearts",
    "♦": "diamonds",
    "♣": "clubs",
};

let deck = [];
let playerHand = [];
let dealerHand = [];
let balance = 1000;
let currentBet = 0;
let gameActive = false;
let dealerRevealed = false;

const playerCardsDiv = document.getElementById("player-cards");
const dealerCardsDiv = document.getElementById("dealer-cards");
const playerTotalSpan = document.getElementById("player-total");
const dealerTotalSpan = document.getElementById("dealer-total");
const statusMessageDiv = document.getElementById("status-message");
const balanceSpan = document.getElementById("balance");
const betAmountInput = document.getElementById("bet-amount");
const dealBtn = document.getElementById("deal-btn");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");
const newGameBtn = document.getElementById("new-game-btn");

function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    shuffleDeck();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCard() {
    if (deck.length === 0) createDeck();
    return deck.pop();
}

function getCardValue(card) {
    if (card.rank === "A") return 11;
    if (["J", "Q", "K"].includes(card.rank)) return 10;
    return parseInt(card.rank);
}

function calculateTotal(hand) {
    let total = 0;
    let aces = 0;

    for (let card of hand) {
        total += getCardValue(card);
        if (card.rank === "A") aces++;
    }

    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }

    return total;
}

function displayCards(hand, container, hideFirst = false) {
    container.innerHTML = "";
    for (let i = 0; i < hand.length; i++) {
        if (hideFirst && i === 0) {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";
            cardDiv.style.background =
                "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)";
            cardDiv.innerHTML =
                '<div style="font-size: 3em; color: #e94560;">?</div>';
            container.appendChild(cardDiv);
        } else {
            const card = hand[i];
            const cardDiv = document.createElement("div");
            cardDiv.className = `card ${suitNames[card.suit]}`;
            cardDiv.innerHTML = `
                <div class="card-rank">${card.rank}</div>
                <div class="card-suit">${card.suit}</div>
            `;
            container.appendChild(cardDiv);
        }
    }
}

function startGame() {
    const bet = parseInt(betAmountInput.value);

    if (isNaN(bet) || bet < 10 || bet > balance) {
        statusMessageDiv.textContent = "Invalid bet amount!";
        statusMessageDiv.className = "status-message lose";
        return;
    }

    playerHand = [];
    dealerHand = [];
    dealerRevealed = false;
    gameActive = true;
    currentBet = bet;
    balance -= bet;
    balanceSpan.textContent = balance;
    statusMessageDiv.textContent = "";
    statusMessageDiv.className = "status-message";

    playerHand.push(dealCard());
    dealerHand.push(dealCard());
    playerHand.push(dealCard());
    dealerHand.push(dealCard());

    displayCards(playerHand, playerCardsDiv);
    displayCards(dealerHand, dealerCardsDiv, true);
    updateTotals();

    const playerTotal = calculateTotal(playerHand);
    if (playerTotal === 21) {
        revealDealerCards();
        const dealerTotal = calculateTotal(dealerHand);
        if (dealerTotal === 21) {
            endGame("draw", "Push! Both have Blackjack");
        } else {
            endGame("win", "Blackjack! You Win!");
        }
    } else {
        hitBtn.disabled = false;
        standBtn.disabled = false;
        dealBtn.disabled = true;
        betAmountInput.disabled = true;
    }
}

function playerHit() {
    hitBtn.disabled = true;
    standBtn.disabled = true;
    playerHand.push(dealCard());
    displayCards(playerHand, playerCardsDiv);
    updateTotals();

    const total = calculateTotal(playerHand);
    if (total > 21) {
        endGame("lose", "Bust! You Lose!");
    } else if (total === 21) {
        playerStand();
    } else {
        hitBtn.disabled = false;
        standBtn.disabled = false;
    }
}

function playerStand() {
    hitBtn.disabled = true;
    standBtn.disabled = true;
    revealDealerCards();
    dealerTurn();
}

function revealDealerCards() {
    dealerRevealed = true;
    displayCards(dealerHand, dealerCardsDiv);
    updateTotals();
}

function dealerTurn() {
    let dealerTotal = calculateTotal(dealerHand);
    const playerTotal = calculateTotal(playerHand);

    while (dealerTotal < 17) {
        dealerHand.push(dealCard());
        displayCards(dealerHand, dealerCardsDiv);
        dealerTotal = calculateTotal(dealerHand);
        updateTotals();
    }

    if (dealerTotal > 21) {
        endGame("win", "Dealer Bust! You Win!");
    } else if (dealerTotal > playerTotal) {
        endGame("lose", "Dealer Wins!");
    } else if (dealerTotal < playerTotal) {
        endGame("win", "You Win!");
    } else {
        endGame("draw", "Push! It's a Tie");
    }
}

function endGame(result, message) {
    gameActive = false;
    statusMessageDiv.textContent = message;
    statusMessageDiv.className = `status-message ${result}`;

    if (result === "win") {
        balance += currentBet * 2;
    } else if (result === "draw") {
        balance += currentBet;
    }

    balanceSpan.textContent = balance;
    dealBtn.disabled = false;
    betAmountInput.disabled = false;
}

dealBtn.addEventListener("click", startGame);
hitBtn.addEventListener("click", playerHit);
standBtn.addEventListener("click", playerStand);
newGameBtn.addEventListener("click", newGame);

createDeck();
newGame();
