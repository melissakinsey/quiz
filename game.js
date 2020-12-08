var question = document.getElementsById("#question");
var choices = document.getElementsByClassName("choice-text");
var scoreText = document.getElementsId("#score");

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var questions = [];

// Use caps for variables that aren't going to change
var SCORE_POINTS = 1;
var MAX_QUESTIONS = 10;

startQuiz = function () {
  return (questionCounter = 0);
};

// Create function declared on line 93 to keep track of the score
getNewQuestion = function () {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  // Calculate the value of the question index
  var questionsIndex = Math.floor(Math.random() * availableQuestions.length),
    currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  // Keep track of which choice the user clicks on, using the data-number property in the HTML.

  choices.forEach(choice) = function () {
    // The dataset is data-number, so we know which choice is selected
    let number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];

    // Remove questions that have already been answered
    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
  };
  // Set up event listener
  choices.forEach(choice) = function () {
    choice.addEventListener("click", e) = function () {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      var selectedChoice = e.target;
      // Number here is choice 1-10
      var selectedAnswer = selectedChoice.dataset["number"];
      // Use ternary operator to toggle green for correct or red for incorrect
      let classToApply =
        selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";

      if (classToApply === "correct") {
        incrementScore(SCORE_POINTS);
      }
      selectedChoice.parentElement.classList.add(classToApply);

      (setTimeout = function () {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }),
        10;
    };
  };
};
