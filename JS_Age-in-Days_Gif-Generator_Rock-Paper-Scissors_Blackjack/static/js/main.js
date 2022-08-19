//Challenge 1 Functions
function submit(){
    var age = document.getElementById("txt-age").value;
    if (age==0 || age==""){
        alert("Enter your age")
    }else{
        var result= age * 365;
        document.getElementById("lbl-result").innerHTML="You're "+result+"days old!";
    }
}

function reset(){
    document.getElementById("lbl-result").innerHTML="";
    document.getElementById("txt-age").value="";
}



//Challenge 2 Functions
function gif(){
    var image = document.createElement('img');
    var div = document.getElementById('gif-area');
    image.src = "static/css/gif/luci.gif";
    image.setAttribute('id', 'luci-gif');
    image.height=175;
    div.appendChild(image);
}

function reset_gif(){
    var divs = document.getElementById('gif-area');
    document.getElementById('luci-gif').remove();
}





//Challenge 3 Functions
function rpsGame(yourChoice){
    var humanChoice, botChoice, results;
    humanChoice = yourChoice.id;
    console.log(yourChoice.src);
    botChoice = pickNumber(randInt());
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    frontEnd(yourChoice.id, botChoice, message);
}

function randInt(){
    return Math.floor(Math.random() * 3);
}

function pickNumber(number){
    return['rock', 'paper', 'scissors'][number]
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper':0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors':0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock':0},
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0){
        return{'message': 'You lost!', 'color': 'red'};
    } else if(yourScore === 0.5){
        return{'message': 'You tied!', 'color': 'yellow'};
    }else{
        return{'message':'You won!', 'color': 'green'};
    }
}

function frontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    //removing of images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    //creating new divs in the #play-rps section
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    //human choice 
    humanDiv.innerHTML = "<img src='" +imagesDatabase[humanImageChoice] +"' height=145px style= 'box-shadow:0px 10px 50px rgb(252,226,5)' id=human-div>"
    document.getElementById('play-rps').appendChild(humanDiv);

    //Declaration of winner
    messageDiv.innerHTML = "<h1 style='color: " +finalMessage['color']+"; font-size:45px; padding: 30px;' onclick=rps_reset() id=message-div>" + finalMessage['message'] +"</h1>" 
    document.getElementById('play-rps').appendChild(messageDiv);


    //computer choice
    botDiv.innerHTML = "<img src='" +imagesDatabase[botImageChoice] +"' height=145px style= 'box-shadow:0px 10px 50px rgb(184,15,10)' id=bot-div>"
    document.getElementById('play-rps').appendChild(botDiv);
}

function rps_reset(){
    document.getElementById('human-div').remove();
    document.getElementById('bot-div').remove();
    document.getElementById('message-div').remove();

    document.getElementById('play-rps').innerHTML = "<img id=rock onclick=rpsGame(this) src=/static/css/img/rock.png>"+
     "<img id=paper onclick=rpsGame(this) src=static/css/img/paper.png>"+
     "<img id=scissors onclick=rpsGame(this) src=static/css/img/scissors.png>"
}





// CHALLENGE 4
let blackjackGame = {
    'you': {'scoreSpan': '#user-result' , 'div': '#user-score', 'score': 0},
    'dealer' : {'scoreSpan': '#dealer-result' , 'div': '#dealer-score', 'score': 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Q', 'A'],
    'cardMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8' : 8, '9':9, '10':10, 'Q': 10, 'A': [1, 11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand': false,
    'turnOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const bustSound = new Audio('static/css/sounds/aww.mp3');
const hitSound = new Audio('static/css/sounds/swish.m4a');
const cashSound = new Audio('static/css/sounds/cash.mp3');

//on click commands per button
document.querySelector('#blackjack-hit').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand').addEventListener('click', blackjackStand);

//hit button
function blackjackHit() {
    if (blackjackGame['isStand'] === false){
        if (YOU['score'] == 0){
            hit();
            hit();
        } else {
            hit();
        }
   }
}

//deal button
function blackjackDeal(){
    if (blackjackGame['turnOver'] == true){

        blackjackGame['isStand'] = false;
        valueReset();
    }
}

//stand button
function blackjackStand() {
    stand();
}

//function for hit
function hit(){
    let card = randomCard();
    showCard(YOU, card);
    updateScore(YOU, card);
}


//function for reseting all changed values
function valueReset(){
    let yourCard = document.querySelector('#user-score').querySelectorAll('img');
    let dealerCard = document.querySelector('#dealer-score').querySelectorAll('img');

    for (let i=0; i<yourCard.length; i++){
        yourCard[i].remove();
    }

    for (let i=0; i<dealerCard.length; i++){
        dealerCard[i].remove();
    }

    YOU['score'] = 0;
    document.querySelector('#user-result').textContent = 0;
    document.querySelector('#user-result').style.color = 'white';

    DEALER['score'] = 0;
    document.querySelector('#dealer-result').textContent = 0;
    document.querySelector('#dealer-result').style.color = 'white';

    document.querySelector('#blackjack-result').textContent = "Let's Play";
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['turnOver'] = false;
}



//function for hit and for BUST
function showCard(activePlayer, card){  
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/css/img/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    } 
}


//function for randoming a card
function randomCard(){
    let randomIndex = Math.floor(Math.random() * 11);
    return blackjackGame['cards'][randomIndex];
}

//function for the scorebar
function updateScore(activePlayer, card){
    //for getting the value for A in blackjack
    if (card == 'A'){
        if (activePlayer['score'] + blackjackGame['cardMap'][card][1] <= 21) {
               activePlayer['score'] += blackjackGame['cardMap'][card][1];
        } else{
            activePlayer['score'] +=blackjackGame['cardMap'][card][0];
        }
    } else{
        activePlayer['score'] += blackjackGame['cardMap'][card]
    }

    showScore(activePlayer);

    if (YOU['score'] > 21){
        bustSound.play();

    }
}

function showScore(activePlayer){
    //updating scorespan
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

//function for sleep/delay of showing per card of the dealer
function sleep(ms){
    return new Promise (resolve => setTimeout(resolve, ms));
}

//function for stand
async function stand(){
    blackjackGame['isStand'] = true;
    while (DEALER['score'] <= 17) {
        let card = randomCard();
        showCard(DEALER, card);
        updateScore(DEALER, card);
        await(sleep(900));
    } 
    blackjackGame['turnOver'] = true;
    result();

}

//function for displaying the winners and scores of user and dealer
function result(){
    let message, messageColor;
    if (blackjackGame['turnOver'] = true) {
        if (DEALER['score'] == YOU['score'] || DEALER['score'] > 21 && YOU['score'] > 21){
            message = 'Draw!';
            messageColor = 'yellow';
            blackjackGame['draws']++;
            document.querySelector("#draws").textContent = blackjackGame['draws'];
        }else if (DEALER['score'] > YOU['score'] || YOU['score'] > 21){
            message = 'You Lost!';
            messageColor = 'red';
            blackjackGame['losses']++;
            document.querySelector("#losses").textContent = blackjackGame['losses'];
            bustSound.play();
        }else if (DEALER['score'] < YOU['score'] || DEALER['score'] > 21){  
            message = 'You Win!';
            messageColor = 'green';
            blackjackGame['wins']++;
            document.querySelector("#wins").textContent = blackjackGame['wins'];
            cashSound.play();
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }

}

