var question = document.getElementsById("#question");
var choices = document.getElementsByClassName("choice-text");
var scoreText = document.getElementsId("#score");

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var questions = [
  {
    question:
      "Technical writing conveys information about which of the following?",
    choice1: "Devices and equipment",
    choice2: "A specific subject",
    choice3: "The CI/CD process",
    choice4: "Engineers' superior intelligence",

    question: "Technical writing requires the use of which kind of language?",
    choice1: "Figurative",
    choice2: "Poetic",
    choice3: "Robotic",
    choice4: "Factual",

    question: "Why is UX/UI design important in technical writing?",
    choice1: "To entertain the reader",
    choice2: "To make the content easier to read and use",
    choice3: "To keep up with technology",
    choice4: "To persuade the reader",

    question: "What is an API?",
    choice1:
      "A code export bundled into a package that can be uploaded as an app",
    choice2: "A standard format for delivering sample apps",
    choice3:
      "A piece of code that performs job routines in software, like a cron job",
    choice4:
      "An interface that allows two computers, apps, or systems to talk to each other programmatically",

    question: "What is open-source documentation?",
    choice1: "The documentation lists the open source licenses for a product",
    choice2:
      "The documentation source is open and available for anyone to consult",
    choice3:
      "The source of the documentation is based on open-source libraries",
    choice4:
      "Anyone can usually fork, re-use, and contribute to the contentCorrect answer",

    question: "What is a pull request?",
    choice1: "A request to set up periodic pulls from a database",
    choice2: "A request to clone a repo",
    choice3: "A request to fork a repo",
    choice4: "A request to merge changes into a forked or cloned repo",

    question: "What does Postman do?",
    choice1: "Execute calls at specific points on a timeline",
    choice2: "Package requests for consumption by a SOAP API",
    choice3: "Handle incoming calls and route them to the orchestration layer",
    choice4: "Execute requests and get responses from a REST API",

    question: "What API parameter details should be documented?",
    choice1: "Data types, min-max values, required/optional, and exammples",
    choice2: "Appearance, callbacks, negatives, booleans",
    choice3: "Order, sequence, and positive/negative data",
    choice4: "Relationships and history",

    question: "What is a callback?",
    choice1:
      "The packet of information returned to the caller after a routine finishes",
    choice2: "A recursive function that creates a loop",
    choice3: "A parameter pointing to an earlier reference value",
    choice4:
      "A function passed as an argument so that the function is called when a process finishes",

    question: "What is a package manager?",
    choice1: "A tool for configuration and distribution of bundled apps",
    choice2: "A repo for app bundles",
    choice3: "A utility for code compresssion",
    choice4:
      "A system that ensures compatibility of code, tools, apps, and plugins",
  },
];

var SCORE_POINTS = 100;
var MAX_QUESTIONS = 10;

startQuiz = function () {
  return (questionCounter = 0);
};

getNewQuestion = function () {
  if (availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }
};
