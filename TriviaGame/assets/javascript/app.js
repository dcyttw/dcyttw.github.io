	var questions = [
	    {
	        question: "1",
	        choices: {
	            A: '1',
	            B: '2',
	            C: '3',
	            D: '4'
	        },
	        correctAnswer: 'A'
	    },
	    {
	        question: "2",
	        choices: {
	            A: '1',
	            B: '2',
	            C: '3',
	            D: '4'
	        },
	        correctAnswer: 'B'
	    },
	    {
	        question: "3",
	        choices: {
	            A: '1',
	            B: '2',
	            C: '3',
	            D: '4'
	        },
	        correctAnswer: 'C'
	    },
	    {
	        question: "4",
	        choices: {
	            A: '1',
	            B: '2',
	            C: '3',
	            D: '4'
	        },
	        correctAnswer: 'D'
	    }
	];

$(document).ready(function() {
	var count = 0;
	var time = 0;
	var intervalId;
	var rightAnswer = 0;
	var wrongAnswer = 0;
	var unAnswer = 0;

	var d1 = $("<div>");
	d1.attr("id", "countdown");

	var d2 = $("<div>");
	d2.attr("id", "display");

	var b = $("<button>");
	b.addClass("button");
	b.attr("btn-state", "start");
	b.append("Start");

	$("body").append(d1);
	$("body").append(d2);
	$("body").append(b);

	$(".button").on("click", function() {
		$(this).hide();
		loadQuestion();
	});

	function createQuiz(q) {
		var p = $("<h1>");
		p.attr("id", "qb");
		p.append(questions[count].question);
		p.append("<br>");
		for (letter in questions[count].choices) {
			var c = $("<button>");
			c.addClass("choice");
			c.attr("value", letter);
			c.append(letter);
			p.append(c);
			p.append("<br>");
		}
		$("#display").append(p);
	}

	function loadQuestion() {
		if (count < questions.length) {
			$("#display").empty();
			createQuiz(questions);
			start();
			count++;
		} else {
			var str = "<h2>Correct: " + rightAnswer + "</h2>";
			str += "<h2>Wrong: " + wrongAnswer + "</h2>";
			str += "<h2>Unanswer: " + unAnswer + "</h2>";
			count = 0;
			rightAnswer = 0;
			wrongAnswer = 0;
			unAnswer = 0;
			$("#display").html(str);
			$(".button").text("Restart");
			$(".button").show();
		}
	}

	$(document.body).on("click", ".choice", function() {
		$("#display").empty();
		if ($(this).attr("value") === questions[count -1].correctAnswer) {
			$("#display").html("<h2>Correct!</h2>");
			var img = $("<img>");
			img.attr("src", "./assets/images/" + questions[count -1].correctAnswer + "_cursiva.gif");
			$("#display").append(img);
			rightAnswer++;
			pause();
		} else {
			$("#display").html("<h2>Nope!<br>Correct Answer was " + questions[count -1].correctAnswer + "</h2>");
			var img = $("<img>");
			img.attr("src", "./assets/images/" + questions[count -1].correctAnswer + "_cursiva.gif");
			$("#display").append(img);
			wrongAnswer++;
			pause();
		}
	});

	function start() {
		time = 10;
		intervalID = setInterval(timer, 1000);
	}

	function pause() {
		clearInterval(intervalID);
		setTimeout(function() { loadQuestion(); }, 3000);
	}

	function timer() {
		if (time === 0) {
			$("#display").html("<h2>Time's up!<br>Correct Answer was " + questions[count -1].correctAnswer + "</h2>")
			var img = $("<img>");
			img.attr("src", "./assets/images/" + questions[count -1].correctAnswer + "_cursiva.gif");
			$("#display").append(img);
			unAnswer++;
			pause();
		}
		console.log(time);
		$("#countdown").html("<h1>Time Remaining: " + time + "</h1>");
		time--;
	}
});