let startButton = document.querySelector(".start-button")

let hitButton = document.querySelector(".hit-button")

let standButton = document.querySelector(".stand-button")

let result = document.querySelector(".result-text")

hitButton.disabled = true

standButton.disabled = true

let hitCardCount = 4

let p = document.createElement('p')

// Números jogados na rodada atual
let cardsInGame = [];
// Cartas Completas (Naipe e Número) na rodada atual
let completeCards = [];
// Cartas já jogadas nessa sessão
let cardsPlayedInThisSession = [];

// soma dos números da CPU
let cpuTotalValue = []
// soma dos números do User
let userTotalValue = []

function generateCard() {

    let randomNumber = Math.floor(Math.random() * 13 + 1);
    let cardValue = randomNumber

    if (randomNumber > 10) {
        cardValue = 10
    }
    
    // transforma os os números especiais em caracteres
    switch (randomNumber) {
        case 1:
            cardSymbol = 'A';
            break;
        case 11:
            cardSymbol = 'J';
            break;
        case 12:
            cardSymbol = 'Q';
            break;
        case 13:
            cardSymbol = 'K';
            break;
        default:
            cardSymbol = cardValue;
    }

    let randomSuit = Math.floor(Math.random() * 4 + 1);

    // transforma o número no naipe 
    switch (randomSuit) {
        case 1:
            randomSuit = " &spades;";
            break;
        case 2:
            randomSuit = " &hearts;";
            break;
        case 3:
            randomSuit = " &diams;";
            break;
        case 4:
            randomSuit = " &clubs;";
            break;
        default:
            return;
    }

    let completeCard = cardSymbol + randomSuit

    // confere se a carta gerada ja está na lista de cartas geradas anteriormenente
    if (cardsInGame.includes(completeCard)) {
        console.log('Carta Repetida Gerada, substituida por outra')
        regenerateCard();
    } else {
        completeCards.push(completeCard);
        cardsInGame.push(cardValue);
        cardsPlayedInThisSession.push(completeCard);
    }

}

function regenerateCard() {
    generateCard()
}

// Gera as 4 cartas iniciais, 2 pro jogador e 2 pra CPU
function start(){

    while (hitCardCount > 4) {
        const createdExtraCards = document.querySelector(".created-extra-cards")
        createdExtraCards.remove()
        hitCardCount--
    }

    generateCard();
    generateCard();
    generateCard();
    generateCard();

    // Cartas Jogador
    let userFirstCard = cardsInGame[0];
    let userSecondCard = cardsInGame[1];

    // Cartas CPU
    let cpuFirstCard = cardsInGame[2];
    let cpuSecondCard = cardsInGame[3];

    let userStartHand = userFirstCard + userSecondCard;
    userTotalValue.push(userStartHand)

    let cpuStartHand = cpuFirstCard + cpuSecondCard;
    cpuTotalValue.push(cpuStartHand)

    console.log(`Números em Jogo: ${cardsInGame}`);

    displayTotalValue()

    console.log(`Cartas Completas: ${completeCards}`);
    console.log(cardsPlayedInThisSession)

    document.querySelector(".cpu-card-1-display").innerHTML = completeCards[2]
    document.querySelector(".cpu-card-2-display").innerHTML = "?"
    document.querySelector(".user-card-1-display").innerHTML = completeCards[0]
    document.querySelector(".user-card-2-display").innerHTML = completeCards[1]  

    startButton.disabled = true

    hitButton.disabled = false

    standButton.disabled = false

    result.innerHTML = ""

    let i = 0
    while(i < 4){
        let label = document.querySelectorAll('.label')[i]
        label.classList.remove('none')
        console.log('a')
        i++
    }
}



function hitCard() {

    generateCard();

    let userP = document.createElement("p")
    userP.classList.add('created-extra-cards')
    
    userP.innerHTML = completeCards[hitCardCount]
    document.querySelector(".user-cards-container").appendChild(userP)
    
    hitCardCount++
    
    userTotalValue[0] = userTotalValue[0] + cardsInGame[cardsInGame.length - 1]

    displayTotalValue()

    if(userTotalValue[0] > 21) {

        // Revela a segunda carta da CPU
        document.querySelector(".cpu-card-2-display").innerHTML = completeCards[3]
        document.querySelector('.cpu-total-display').innerHTML = cpuTotalValue

        console.log("Lose")

        restartRound()

        result.innerHTML = "Derrota :("
    }

    if (userTotalValue[0] == 21) {
        stand()
    }
    
}

// Mostra a pontuação de cada jogador
function displayTotalValue() {

    console.log(`Total Jogador: ${userTotalValue}`)
    console.log(`Total CPU: ${cpuTotalValue}`)

    document.querySelector('.user-total-display').innerHTML = userTotalValue
    document.querySelector('.cpu-total-display').innerHTML = "?"

}

// Função de parar
function stand() {

    while(cpuTotalValue[0] < userTotalValue[0]){

        generateCard()

        // Revela a segunda carta da CPU
        document.querySelector(".cpu-card-2-display").innerHTML = completeCards[3]

        let cpuP = document.createElement("p")
        cpuP.classList.add('created-extra-cards')
        
        cpuP.innerHTML = completeCards[hitCardCount]
        document.querySelector(".cpu-cards-container").appendChild(cpuP)

        hitCardCount++

        cpuTotalValue[0] = cpuTotalValue[0] + cardsInGame[cardsInGame.length - 1]
        console.log(cpuTotalValue[0])

    }

    displayTotalValue()
    
    if(cpuTotalValue[0] == userTotalValue[0]) {

        // Revela a segunda carta da CPU
        document.querySelector(".cpu-card-2-display").innerHTML = completeCards[3]
        document.querySelector('.cpu-total-display').innerHTML = cpuTotalValue

        console.log('empate')
        restartRound()

        result.innerHTML = "Empate :/"
    }

    if(cpuTotalValue[0] > 21){

        // Revela a segunda carta da CPU
        document.querySelector(".cpu-card-2-display").innerHTML = completeCards[3]
        document.querySelector('.cpu-total-display').innerHTML = cpuTotalValue

        console.log("Win")
        restartRound()

        result.innerHTML = "Vitória :)"
    }

    
    if(cpuTotalValue[0] > userTotalValue[0] && cpuTotalValue[0] <= 21){

        //  Revela a segunda carta da CPU
        document.querySelector(".cpu-card-2-display").innerHTML = completeCards[3]
        document.querySelector('.cpu-total-display').innerHTML = cpuTotalValue

        console.log("Lose")
        restartRound()

        result.innerHTML = "Derrota :("

        result.classList.add('result-transition')

    }

}

// Limpar os Arrays da rodada atual
function restartRound(){
    
    cardsInGame.length = 0
    completeCards.length = 0
    userTotalValue.length = 0
    cpuTotalValue.length = 0

    startButton.disabled = false
    hitButton.disabled = true
    standButton.disabled = true

    if (cardsPlayedInThisSession.length >= 26) {
        console.log(cardsPlayedInThisSession)
        cardsPlayedInThisSession.length = 0
    }
}

//dividir
// As valer 11 ou 10

