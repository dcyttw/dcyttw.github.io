// Game setup.
var wins = 0;
var currentWord = "";
var guessRemain = 6;
var correctAnswer = false;
var guessLetter = [];
var words = [];
var randomWord = [];

window.onload = function() {
	gameSet();
};

document.onkeyup = function(event) {
	// Determines which key was pressed.
	var userGuess = (event.key).toLowerCase();
	for (var i = 0; i < randomWord.length; i++) {
		if (randomWord[i] === userGuess) {
			correctAnswer = true;
			var splitWord = currentWord.split("");
			splitWord[i] = userGuess;
			currentWord = splitWord.join("");
		}
	}
	document.getElementById("currentWord").innerHTML = (currentWord);
	if (correctAnswer == false) {
		var repeatAnswer = false;
		for (var j = 0; j < guessLetter.length; j++) {
			if (guessLetter[j] === userGuess) {
				repeatAnswer = true;
			}
		}
		if (!repeatAnswer) {
			guessLetter.push(userGuess);
			guessRemain--;
			document.getElementById("guessRemain").innerHTML = ("Guesses Remaining: " + guessRemain);
			imgHangman();
			displayGuess();
		}	
	}
	correctAnswer = false;
	checkWin()
};

function checkWin() {
	if (currentWord === randomWord) {
		wins++;
		document.getElementById("gameMessage").innerHTML = "You Win! It's " + randomWord + ".";
		var audioWin = new Audio('./assets/sound/Heal8-Bit.ogg');
		audioWin.play();
		gameSet();
	}
	if (guessRemain === 0) {
		document.getElementById("gameMessage").innerHTML = "You Lose! It's " + randomWord + ".";
		var audioLose = new Audio('./assets/sound/BossDeath.ogg');
		audioLose.play();
		gameSet();
	}
}

function gameSet() {
	currentWord = "";
	guessRemain = 6;
	guessLetter = [];
	document.getElementById("imgHangman").src = "./assets/images/hangman-" + guessLetter.length + ".png"
	document.getElementById("wins").innerHTML = "Win: " + wins;
	document.getElementById("guessRemain").innerHTML = "Guesses Remaining: " + guessRemain;
	// Creates an array that lists out all of the options.
	words = ["apple", "banana", "blueberry", "cherry", "durian", "grape", "kiwi", "mango", "orange", "papaya", "peach", "pear", "pineapple", "raspberry", "strawberry", "watermelon"];
	randomWord = words[Math.floor(Math.random() * words.length)];
	// alert(randomWord);
	for (var i = 0; i < randomWord.length; i++) {
		currentWord += "_"
	}
	document.getElementById("currentWord").innerHTML = (currentWord);
	document.getElementById("guessLetter").innerHTML = "";
}

function displayGuess() {
	for (var i = 0; i < guessLetter.length; i++) {
		if (i > 0) {
			document.getElementById("guessLetter").innerHTML += ", " + guessLetter[i].toUpperCase();
		} else {
			document.getElementById("guessLetter").innerHTML = guessLetter[i].toUpperCase();
		}
	}
}

function imgHangman() {
	document.getElementById("imgHangman").src = "./assets/images/hangman-" + guessLetter.length + ".png"
}
