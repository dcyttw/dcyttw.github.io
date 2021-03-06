var wins = 0;
var losses = 0;
var sum = 0;
var randomNumber = 0;

var red = 0;
var white = 0;
var green = 0;
var blue = 0;

$(document).ready(function() {
	startGame();

	$("#red").click(function(){
		sum += red;
		updateSum();
	})

	$("#white").click(function(){
		sum += white;
		updateSum();
	})

	$("#green").click(function(){
		sum += green;
		updateSum();
	})

	$("#blue").click(function(){
		sum += blue;
		updateSum();
	})

	function updateSum() {
		if (sum === randomNumber) {
			wins++;
			$("#gameMessage").append("You Win!<br>");
			startGame();
		} else if (sum > randomNumber) {
			losses++;
			$("#gameMessage").append("You Lose!<br>");
			startGame();
		} else {
			$("#gameMessage").empty();
			$("#sum").empty();
			$("#sum").append(sum);
		}
	}

	function startGame() {
		randomNumber = Math.floor((Math.random() * 100) + 19);
		sum = 0;
		red = Math.floor((Math.random() * 12) + 1);
		white = Math.floor((Math.random() * 12) + 1);
		green = Math.floor((Math.random() * 12) + 1);
		blue = Math.floor((Math.random() * 12) + 1);
		$("#randomNumber").empty();
		$("#randomNumber").append(randomNumber);
		$("#wins").empty();
		$("#wins").append("Wins: " + wins);
		$("#losses").empty();
 		$("#losses").append("Losses: " +losses);
 		$("#sum").empty();
 		$("#sum").append(sum);
	}
});