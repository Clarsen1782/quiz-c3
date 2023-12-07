var beginButtonEl = $("#begin");
var questionsEl = $("#questions");
var choicesContainerEl = $("#choices");
var submitButtonEl = $("#submit");

var timerSeconds = 30;
var timerInterval;
var isTimerRunning = false;

var questionsArray = [
  {
    question: "JavaScript is the programming language of the _____.",
    choices: ["Desktop", "Mobile", "Web", "Server"],
    correctAnswer: "Web",
  },
  {
    question: "JavaScript code can be written in ____.",
    choices: ["JavaScript file (.js file)", "HTML document directly", "JavaScript file and in HTML document directly", "In style sheets (.css file)"],
    correctAnswer: "JavaScript file and in HTML document directly",
  },
  {
    question: "In JavaScript, a single-line comment begins with ___.",
    choices: ["#", "/*", "$", "//"],
    correctAnswer: "//",
  },
  {
    question: "Which JavaScript keyword is used to declare a variable?",
    choices: ["Var", "var*", "let", "All of the Above"],
    correctAnswer: "Var",
  },
  {
    question: "JavaScript language is _____?",
    choices: ["Object-oriented", "Object-based*", "Functional programming", "All of the above"],
    correctAnswer: "Object-based",
  },
];

var currentQuestionIndex = 0;
var userScore = 0;

beginButtonEl.on("click", function () {
  startTimer();
  displayQuestion(currentQuestionIndex);
});

submitButtonEl.on("click", function () {
  stopTimer();

  var selectedChoice = $("input[name='choice']:checked").val();
  var correctAnswer = questionsArray[currentQuestionIndex].correctAnswer;

  if (!selectedChoice) {
    alert("Please select an answer before submitting.");
    startTimer();
    return;
  }

  if (selectedChoice === correctAnswer) {
    alert("Correct! Adding 5 seconds. Next question.");
    timerSeconds += 5;
    userScore++;
  } else {
    alert("Incorrect. Deducting 10 seconds. Try again.");
    timerSeconds -= 10;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questionsArray.length) {
    displayQuestion(currentQuestionIndex);
    startTimer();
  } else {
    endQuiz();
  }
});

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    timerInterval = setInterval(function () {
      timerSeconds--;
      if (timerSeconds <= 0) {
        stopTimer();
        alert("Time's up! Quiz completed.");
        endQuiz();
      }
    }, 1000);
  }
}

function stopTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);
}

function displayTopScores() {
  var savedScores = JSON.parse(localStorage.getItem('allScores')) || [];

  savedScores.sort(function (a, b) {
    return b.score - a.score;
  });

  var topScores = savedScores.slice(0, 5);
  console.log("Top 5 Scores:", topScores);

  var scoresList = document.getElementById('scoresList');
  scoresList.innerHTML = '<h2>Top 5 Scores</h2>';
  topScores.forEach(function (score, index) {
    scoresList.innerHTML += '<p>' + (index + 1) + '. ' + score.initials + ': ' + score.score + '</p>';
  });
}

function endQuiz() {
  alert("Quiz completed! Your score is: " + userScore);

  var userInitials = prompt("Enter your initials:");

  var scoreData = {
    initials: userInitials,
    score: userScore,
  };

  var allScores = JSON.parse(localStorage.getItem('allScores')) || [];

  allScores.push(scoreData);

  localStorage.setItem('allScores', JSON.stringify(allScores));

  console.log("User Initials: " + scoreData.initials);
  console.log("User Score: " + scoreData.score);

  displayTopScores();
}

window.onload = displayTopScores;

function displayQuestion(index) {
  var currentQuestion = questionsArray[index];

  if (!currentQuestion) {
    endQuiz();
    return;
  }

  var questionText = currentQuestion.question;
  var correctAnswer = currentQuestion.correctAnswer;

  questionsEl.html(questionText);
  choicesContainerEl.empty();

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choiceLabel = $("<label>");
    var choiceInput = $("<input type='radio' name='choice' value='" + currentQuestion.choices[i] + "'>");

    choiceLabel.append(choiceInput);
    choiceLabel.append(currentQuestion.choices[i]);

    if (currentQuestion.choices[i] === correctAnswer) {
      choiceLabel.addClass("correct-answer");
    }

    choicesContainerEl.append(choiceLabel);
    choicesContainerEl.append("<br>");
  }
}

submitButtonEl.on("click", function () {
  if (currentQuestionIndex === questionsArray.length) {
    alert("All questions answered! Quiz completed.");
    endQuiz();
  }
});
