// Declare variables for questions, answer choices, and start button
let question = document.getElementById("question");
let choices = document.getElementById("choices");
let start = document.getElementById("start");
// Declare variables for the word "Score" (score_prefix) and the numeric quiz score itself (scoreText)
let scoreText = document.getElementById("score");
let score_prefix = document.getElementById("score-prefix");
// Declare variable for input area for the player's initials
var initialsContainer = document.getElementById("initials");
// Declare variables for leaderboard and other elements
let leaderBoard = document.querySelector("#leaderBoard");
var currentQuestion = {};
var score = 0;
var questionCounter = 0;
// Declare variable to hold array of quiz questions
var availableQuestions = [];
// Declare variables for points, number of quiz questions, and number of minutes on timer
var SCORE_POINTS = 0;
var MAX_QUESTIONS = 10;
var minForQuiz = 10;

// Declare variable to hold array of questions, answer choices, and correct answers
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
    correctanswer: "A specific technical topic",
  },
  {
    question: "Technical writing uses which kind of language?",
    choices: ["Figurative", "Poetic", "Robotic", "Factual"],
    correctanswer: "Factual",
  },
  {
    question: "Why is UX/UI design important in tech writing?",
    choices: [
      "To entertain the user",
      "To make content easier to understand",
      "To make the content look slick",
      "To persuade the user to agree with the writer",
    ],
    correctanswer: "To make content easier to understand",
  },
  {
    question: "What is an API developer portal?",
    choices: [
      "A site offering complete API user documentation and help",
      "A co-working space for API devs",
      "A social network for API developers, architects, and analysts",
      "A point of departure for developers looking for cool new APIs",
    ],
    correctanswer: "A site offering complete API user documentation and help",
  },
  {
    question: "What makes open-source documentation unique?",
    choices: [
      "It uses unencrypted data",
      "It's built from crowdsourced data",
      "Anyone can fork, clone, or contribute to its content",
      "It's funded by Patreon members",
    ],
    correctanswer: "Anyone can fork, clone, or contribute to its content",
  },
  {
    question: "Why would a technical writer make a pull request?",
    choices: [
      "To clone a repository",
      "To fork a repo",
      "To gauge the depth of a datalake",
      "To merge documentation changes into the main repo",
    ],
    correctanswer: "To merge documentation changes into the main repo",
  },
  {
    question: "How would a tech writer use Postman?",
    choices: [
      "To generate mocks used in API documentation",
      "To return a call to the sender when the writer's address is unknown",
      "To ensure that the writer always rings twice",
      "To ensure swift completion of the writer's appointed rounds",
    ],
    correctanswer: "To generate mocks used in API documentation",
  },
  {
    question: "Which of the following is not a good measure of API success?",
    choices: [
      "Time to 'Hello, World' (TTHW)",
      "Traffic",
      "Frequency of support calls",
      "Budget (measured in Schrutebucks)",
    ],
    correctanswer: "Budget (measured in Schrutebucks)",
  },
  {
    question:
      "Which of the following would not be part of an API quick-start guide?",
    choices: [
      "Instructions for securing an access key",
      "Instructions for common tasks",
      "Typical use cases for each endpoint",
      "Number of miles to the sun (Shut up about the sun!)",
    ],
    correctanswer: "Number of miles to the sun (Shut up about the sun!)",
  },
  {
    question: "Which term best describes a successful technical writer?",
    choices: [
      "Detail oriented",
      "Antisocial",
      "Works hard, plays hard",
      "Sales-y",
    ],
    correctanswer: "Detail oriented",
  },
];
// Set up timer
let timer = "";
let time = "";
let quizTimer = document.getElementById("timer");
// Start quiz (reset score, start timer, display first question, begin keeping score, etc.)
let startQuiz = function () {
  questionCounter = 0;
  SCORE_POINTS = 0;
  scoreText.innerText = "";
  availableQuestions = [...questions.slice(0, MAX_QUESTIONS)];
  startTimer();
  score_prefix.style.display = "none";
  start.style.display = "none";
  leaderBoard.innerHTML = "";
};
// Add input handler to let user enter and save his/her/their initials at end of game
function addInput() {
  let input = document.createElement("input");
  input.oninput = function (e) {
    name = e.target.value;
  };
  let btn = document.createElement("button");
  btn.innerText = "Save";
  let header = document.createElement("h1");
  header.innerText = "Please enter your initials";
  return [input, btn, header];
}
// Start or restart timer with each new game; clear previous time remaining
function startTimer() {
  clearInterval(timer);
  time = new Date();
  time.setMinutes(minForQuiz);
  time.setSeconds(0);
  quizTimer.innerHTML = `${time.getMinutes()}:${time
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  // Display running timer (min:sec), subtracting seconds as game progresses and stopping quiz when timer reaches zero
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
// When quiz ends, total the user's score and display it, show input area for user's initials, save entered initials to leaderboard, display leaderboard
let stopQuiz = function () {
  choices.innerHTML = "";
  scoreText.innerHTML = SCORE_POINTS;
  question.innerHTML = "";
  clearInterval(timer);
  let [input, btn, header] = addInput();
  let initials = "";
  input.oninput = function (e) {
    initials = e.target.value;
  };
  btn.onclick = function () {
    saveToLeaderBoard(initials);
    initialsContainer.innerHTML = "";
  };
  initialsContainer.append(header, input, btn);
  score_prefix.style.display = "block";
};

// Parse string to save initials in local storage
let saveToLeaderBoard = function (initials = "AB") {
  let leaderBoard = localStorage.getItem("leaderBoard");
  if (leaderBoard) {
    leaderBoard = JSON.parse(leaderBoard);
  }
  // Show nothing if no scores/initials are available in local storage
  else {
    leaderBoard = [];
  }
  // Push saved initials and score to leaderboard
  leaderBoard.push({
    initials: initials,
    score: SCORE_POINTS,
  });
  // If score and initials are saved in local storage, stringify to display on leaderboard
  localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
  showLeaderBoard(leaderBoard);
  start.style.display = "block";
};
// Display leaderboard as a numbered list of scores
function showLeaderBoard(list) {
  let leaderBoard = document.querySelector("#leaderBoard");
  leaderBoard.innerHTML = "";
  // Arrange items (initials: score) in descending order, with highest score at top of list
  list.sort((a, b) => b.score - a.score);
  list.forEach((item) => {
    leaderBoard.innerHTML += `
        <li>${item.initials}: ${item.score}</li>
        `;
  });
}
// Get new question each time one is answered
let getNewQuestion = function () {
  // Set up array to structure list of answer choices
  let prefixes = ["A", "B", "C", "D"];
  // Cut last question from array and store in variable
  let current = availableQuestions.pop();
  if (current) {
    // Use forEach method to call choice prefix [A, B, C, and D] and choice text for each question in the array
    question.innerHTML = current.question;
    choices.innerHTML = "";
    current.choices.forEach((choice, index) => {
      // Display alpha prefixes and answer choices on buttons
      choices.innerHTML += `
          <button type="button" class="btn btn-outline-info d-grid gap-2 col-6 mx-auto" data-bs-toggle="button">
          <p class="choice-prefix">${prefixes[index]}</p>
          <p class="choice-text" data-number="${index}">${choice}</p>
          </button><br/><br/>
          `;
    });
    // Use HTML data-number property to track the user's answer choices
    choices.querySelectorAll("button").forEach(function (choice) {
      choice.onclick = function () {
        // The dataset is data-number, so we know which choice is selected
        let number = choice.querySelector("p.choice-text").dataset["number"];
        // Set up scoring so that a point is added for each correct response and time is deducted for each incorrect response
        if (current.choices[number] == current.correctanswer) {
          SCORE_POINTS += 1;
          console.log("correct");
        } else {
          console.log("incorrect");
          // Set up timer so that it subtracts time in proportion to the number of quiz questions
          let howManySecToReduce = (minForQuiz * 60) / MAX_QUESTIONS;
          time.setSeconds(time.getSeconds() - howManySecToReduce);
        }
        getNewQuestion();
      };
    });
  } else {
    stopQuiz();
  }
};
// Begin quiz when user clicks the start button
start.onclick = function () {
  startQuiz();
  getNewQuestion();
};
