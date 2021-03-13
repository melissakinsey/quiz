var question = document.getElementById("question");
var choices = document.getElementById("choices");
var start = document.getElementById("start");
//var choices = document.getElementsByClassName("choice-text");

var scoreText = document.getElementById("#score");
var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

// Use caps for variables that aren't going to change
var SCORE_POINTS = 0;
var MAX_QUESTIONS = 10;

var questions = [
  {
    question: "What color is the sky?",
    choices: ["red", "blue", "green", "yellow"],
    correctAnswer: "blue",
  },
  {
    question: "What color is the sky?",
    choices: ["red", "blue", "green", "yellow"],
    correctAnswer: "blue",
  },
  {
    question: "question 1 here",
    choices: ["1a here", "1b here", "1c here", "1d here"],
    correctanswer: "1b here",
  },
  {
    question: "question 2 here",
    choices: ["2a here", "2b here", "2c here", "2d here"],
    correctanswer: "2a here",
  },
  {
    question: "question 3 here",
    choices: ["3a here", "3b here", "3c here", "3d here"],
    correctanswer: "3d here",
  },
];

let startQuiz = function () {
  // Reset counter
  questionCounter = 0;

  SCORE_POINTS = 0;
  // Reset available questions before each new game
  availableQuestions = [...questions];
};

// Create function declared on line 93 to keep track of the score
let getNewQuestion = function () {
  // if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
  //   localStorage.setItem("mostRecentScore", score);
  //   return window.location.assign("/end.html");
  // }

  // Calculate the value of the question index
  // var questionsIndex = Math.floor(Math.random() * availableQuestions.length),
  //   currentQuestion = availableQuestions[questionsIndex];
  // question.innerText = currentQuestion.question;

  // Set up array to structure list of choices
  let prefixes = ["A", "B", "C", "D"];
  // Cut last question from array and store in variable
  let current = availableQuestions.pop();
  // Use forEach method to call choice prefix [A, B, C, and D] and choice text for each question in the array.
  question.innerHTML = current.question;
  current.choices.forEach((choice, index) => {
    // Make selected prefix and choice text appear on button.
    choices.innerHTML += `
      <button type="button" class="btn btn-info btn-block">
        <p class="choice-prefix">${prefixes[index]}</p>
        <p class="choice-text" data-number="${index}">${choice}</p>
      </button><br/><br/>
    `;
  });

  // Keep track of which choice the user clicks on, using the data-number property in the HTML.

  choices.querySelectorAll("button").forEach(function (choice) {
    choice.onclick = function () {
      // The dataset is data-number, so we know which choice is selected
      let number = choice.querySelector("p.choice-text").dataset["number"];

      if (current.choices[number] == current.choices.correctanswer) {
        SCORE_POINTS += 1;
      } else {
        //reduce timer
      }
    };
  });
  // Set up event listener
  //   choices.forEach(choice) = function () {
  //     choice.addEventListener("click", e) = function () {
  //       if (!acceptingAnswers) return;
  //
  //       acceptingAnswers = false;
  //       var selectedChoice = e.target;
  //       // Number here is choice 1-10
  //       var selectedAnswer = selectedChoice.dataset["number"];
  //       // Use ternary operator to toggle green for correct or red for incorrect
  //       let classToApply =
  //         selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";
  //
  //       if (classToApply === "correct") {
  //         incrementScore(SCORE_POINTS);
  //       }
  //       selectedChoice.parentElement.classList.add(classToApply);
  //
  //       (setTimeout = function () {
  //         selectedChoice.parentElement.classList.remove(classToApply);
  //         getNewQuestion();
  //       }),
  //         10;
  //     };
  //   };
};

start.onclick = function () {
  startQuiz();
  getNewQuestion();
};
