const iconsArray = [
    {
        name: "hippo",
        icon: '<i class="fa-solid fa-hippo"></i>'
    },
    {
        name: "dog",
        icon: '<i class="fa-solid fa-dog"></i>'
    },
    {
        name: "cow",
        icon: '<i class="fa-solid fa-cow"></i>'
    },
    {
        name: "crow",
        icon: '<i class="fa-solid fa-crow"></i>'
    },
    {
        name: "fish",
        icon: '<i class="fa-solid fa-fish-fins"></i>'
    },
    {
        name: "spider",
        icon: '<i class="fa-solid fa-spider"></i>'
    },
    {
        name: "hippo",
        icon: '<i class="fa-solid fa-hippo"></i>'
    },
    {
        name: "dog",
        icon: '<i class="fa-solid fa-dog"></i>'
    },
    {
        name: "cow",
        icon: '<i class="fa-solid fa-cow"></i>'
    },
    {
        name: "crow",
        icon: '<i class="fa-solid fa-crow"></i>'
    },
    {
        name: "fish",
        icon: '<i class="fa-solid fa-fish-fins"></i>'
    },
    {
        name: "spider",
        icon: '<i class="fa-solid fa-spider"></i>'
    }
]

let flippedCard = []
let matchedPairs = 0
const gameBoard = document.getElementById("gameBoard")
const reset = document.getElementById("reset").addEventListener('click', newGame)
let trackMatch = document.getElementById("matchFound")

shuffleCards();
displayCards();

trackMatch.innerHTML = "Get ready!"
trackMatch.style.fontSize = "24px"
trackMatch.style.fontWeight = "bold"

function newGame() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild)
    }
    trackMatch.innerHTML = "Get ready!"
    gameBoard.removeAttribute("style")
    flippedCard = [];
    matchedPairs = 0;
    shuffleCards();
    displayCards();
}

function shuffleCards() {
    for (let i = iconsArray.length - 1; i > 0; i--) {
        const randomShuffle = Math.floor(Math.random() * (i + 1));
        [iconsArray[i], iconsArray[randomShuffle]] = [iconsArray[randomShuffle], iconsArray[i]]
    }
}

function displayCards() {
    iconsArray.forEach((curr, index, arr) => {
        const card = document.createElement("div")
        card.setAttribute("id", index)
        card.classList.add('cardback')
        card.addEventListener('click', flipCard)
        gameBoard.append(card)
    })
}

function flipCard() {
    trackMatch.innerHTML = `Cards Flipped : ${matchedPairs}`
    if (flippedCard.length < 2) {
        const cardId = this.getAttribute('id')
        flippedCard.push(this)
        this.classList.remove('cardback')
        this.innerHTML = iconsArray[cardId].icon
    }
    if (flippedCard.length == 2) {
        setTimeout(checkMatch, 1000)
    }

}

function checkMatch() {
    const cardOneId = flippedCard[0].getAttribute('id')
    const cardTwoId = flippedCard[1].getAttribute('id')

    if (iconsArray[cardOneId].name === iconsArray[cardTwoId].name) {
        flippedCard[0].style.pointerEvents = "none"
        flippedCard[1].style.pointerEvents = "none"
        matchedPairs++;
        trackMatch.innerHTML = `Cards Flipped : ${matchedPairs}`
        checkGameOver()
    }
    else {
        flippedCard[0].innerHTML = ""
        flippedCard[0].classList.add("cardback")
        flippedCard[1].innerHTML = ""
        flippedCard[1].classList.add("cardback")
    }
    flippedCard = []
}

function checkGameOver() {
    if (matchedPairs == iconsArray.length / 2) {
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild)
        }
        trackMatch.innerHTML = "Well done! You matched all the pairs!"
        gameBoard.innerHTML = "You Won"
        gameBoard.style.display = "flex"; gameBoard.style.position = "fixed"; gameBoard.style.top = "50%";
        gameBoard.style.left = "50%";
        gameBoard.style.transform = "translate(-50%, -50%)";
        gameBoard.style.background = "linear-gradient(135deg, #A8E6CF, #DCEDC1, #FFD3B6)";
        gameBoard.style.color = "#2C2C2C"; gameBoard.style.fontSize = "2rem"; gameBoard.style.fontWeight = "bold"; gameBoard.style.padding = "20px 40px"; gameBoard.style.borderRadius = "15px"; gameBoard.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
        gameBoard.style.textAlign = "center";
    }
}