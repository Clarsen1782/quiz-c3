var beginButtonE1 = $("#begin");
var questionsE1 = $("#questions");
var choicesContainerE1 = $("#choices");
var submitButtonE1 = $("#submit");

var isDark = true;

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
    question: "In JavaScript, single line comment begins with ___.",
    choices: ["#", "/*", "$", "//"],
    correctAnswer: "//",
  },
  {
    question: "Which JavaScript keyword is used to declare a variable?",
    choices: ["Var", "var*", "let", "All of the Above"],
    correctAnswer: "var",
  },
  {
    question: "JavaScript language is _____?",
    choices: ["Object-oriented", "Object-based*", "Functional programming", "All of the above"],
    correctAnswer: "Object-based",
  },
];

var currentQuestionIndex = 0;

beginButtonE1.on("click", function () {
  displayQuestion(currentQuestionIndex);
});

submitButtonE1.on("click", function () {
    var selectedChoice = $("input[name='choice']:checked").val();
    var correctAnswer = questionsArray[currentQuestionIndex].correctAnswer;
  
    if (!selectedChoice) {
      alert("Please select an answer before submitting.");
      return; 
    }
  
    if (selectedChoice === correctAnswer) {
      alert("Correct! Next question.");
      currentQuestionIndex++;
      if (currentQuestionIndex < questionsArray.length) {
        displayQuestion(currentQuestionIndex);
      } else {
        alert("Quiz completed!");
        // You may want to perform some action when the quiz is completed
      }
    } else {
      alert("Incorrect. Try again.");
      // You might want to implement logic for incorrect answers
    }
  });
  

  function displayQuestion(index) {
    var currentQuestion = questionsArray[index];
    var questionText = currentQuestion.question;
    var answer = currentQuestion.answer; 
  
    questionsE1.html(questionText);
  
    choicesContainerE1.empty();
  
    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var choiceLabel = $("<label>");
      var choiceInput = $("<input type='checkbox' name='choice' value='" + currentQuestion.choices[i] + "'>");
      choiceLabel.append(choiceInput);
      choiceLabel.append(currentQuestion.choices[i]);
  
      choicesContainerE1.append(choiceLabel);
      choicesContainerE1.append("<br>");
    }
  
    $(".answer-link").on("click", function() {
      alert("Answer: " + answer); 
    });
  }
  
