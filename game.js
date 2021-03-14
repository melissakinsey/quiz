var question = document.getElementById("question");
var choices = document.getElementById("choices");
var start = document.getElementById("start");
//var choices = document.getElementsByClassName("choice-text");

var scoreText = document.getElementById("score");
var initials = document.getElementById("initials");
var name = "";

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

// Use caps for variables that aren't going to change
var SCORE_POINTS = 0;
var MAX_QUESTIONS = 5;
var minForQuiz = 10;

var questions = [
  {
    question:
      "Technical writing conveys information about which of the following?",
    choices: [
      "Tools and libraries",
      "A specific technical topic",
      "The CI/CD process",
      "Engineers' superior intelligence",
    ],
    correctAnswer: "A specific technical topic",
  },
  {
    question: "Technical writing uses which kind of language?",
    choices: ["Figurative", "Poetic", "Robotic", "Factual"],
    correctAnswer: "Factual",
  },
  {
    question: "Why is UX/UI design important in tech writing?",
    choices: [
      "To entertain the user",
      "To make site content easier to understand",
      "To make the content look slick",
      "To persuade the user to agree with the writer",
    ],
    correctanswer: "To make site content easier to understand",
  },
  {
    question: "What is an API developer portal?",
    choices: ["2a here", "2b here", "2c here", "2d here"],
    correctanswer: "2a here",
  },
  {
    question: "Why would a technical writer make a pull request?",
    choices: ["3a here", "3b here", "3c here", "3d here"],
    correctanswer: "3d here",
  },
  {
    question: "How would a tech writer use Postman?",
    choices: ["3a here", "3b here", "3c here", "3d here"],
    correctanswer: "3d here",
  },
  {
    question: "Which of the following is not a good measure of API success?",
    choices: ["3a here", "3b here", "3c here", "3d here"],
    correctanswer: "3d here",
  },
  {
    question:
      "Which of the following would not be part of an API quick-start guide?",
    choices: ["3a here", "3b here", "3c here", "3d here"],
    correctanswer: "3d here",
  },
  {
    question: "Which term best describes a successful technical writer?",
    choices: ["3a here", "3b here", "3c here", "3d here"],
    correctanswer: "3d here",
  },
];
let timer = "";
let time = "";
let quizTimer = document.getElementById("timer");

let startQuiz = function () {
  // Reset counter
  questionCounter = 0;
  SCORE_POINTS = 0;
  // Reset available questions before each new game
  availableQuestions = [...questions.slice(0, MAX_QUESTIONS)];
  startTimer();
};

function addInput() {
  let input = document.createElement("input");
  input.oninput = function (e) {
    name = e.target.value;
  };
  let btn = document.createElement("button");
  btn.innerText = "save";
  return [input, btn];
}

function startTimer() {
  clearInterval(timer);
  time = new Date();
  time.setMinutes(minForQuiz);
  time.setSeconds(0);
  quizTimer.innerHTML = `${time.getMinutes()}:${time
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  timer = setInterval(() => {
    if (time.getMinutes() === 0 && time.getSeconds() === 0) {
      stopQuiz();
    } else {
      time.setSeconds(time.getSeconds() - 1);
      quizTimer.innerHTML = `${time.getMinutes()}:${time
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
    }
  }, 1000);
}

let stopQuiz = function () {
  choices.innerHTML = "";
  scoreText.innerHTML = SCORE_POINTS;
  question.innerHTML = "";
  clearInterval(timer);
  initials.append(...addInput());
  saveToLeaderBoard();
};

let saveToLeaderBoard = function (initials = "AB") {
  let leaderBoard = localStorage.getItem("leaderBoard");
  if (leaderBoard) {
    leaderBoard = JSON.parse(leaderBoard);
  } else {
    leaderBoard = [];
  }

  leaderBoard.push({
    initials: initials,
    score: SCORE_POINTS,
  });
  localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
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
  if (current) {
    // Use forEach method to call choice prefix [A, B, C, and D] and choice text for each question in the array.
    question.innerHTML = current.question;
    //clear previous choices
    choices.innerHTML = "";
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

        if (current.choices[number] == current.correctanswer) {
          SCORE_POINTS += 1;
          console.log("correct");
        } else {
          console.log("incorrect");
          //reduce timer
          let howManySecToReduce = (minForQuiz * 60) / MAX_QUESTIONS;
          time.setSeconds(time.getSeconds() - howManySecToReduce);
        }
        getNewQuestion();
      };
    });
  } else {
    stopQuiz();
  }

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
