var question = document.getElementsById ("#question");
var choices = document.getElementsByClassName("choice-text");
var scoreText = document.getElementsId ("#score");

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = []
var questions = [{
    question: "Technical writing is a style of communication used to do which one of the following?",
    choice1: "Convey information about devices and equipment",
    choice2: "Convey information about a specific subject",
    choice3: "Convey information about sound engineering practices",
    choice4: "Convey information in a way that makes engineers look super smart",

    question: "Lorem question ipsum?",
    choice1: "Lorem choice ipsum",
    choice2: "Lorem choice ipsum",
    choice3: "Lorem choice ipsum",
    choice4: "Lorem choice ipsum",
    
    question: "Lorem question ipsum?",
    choice1: "Lorem choice ipsum",
    choice2: "Lorem choice ipsum",
    choice3: "Lorem choice ipsum",
    choice4: "Lorem choice ipsum",

    question: "Lorem question ipsum?",
    choice1: "Lorem choice ipsum",
    choice2: "Lorem choice ipsum",
    choice3: "Lorem choice ipsum",
    choice4: "Lorem choice ipsum",

    question: "Lorem question ipsum?",
    choice1: "Lorem choice ipsum",
    choice2: "Lorem choice ipsum",
    choice3: "Lorem choice ipsum",
    choice4: "Lorem choice ipsum",

    question: "Lorem question ipsum?",
    choice1: "Lorem choice ipsum",
    choice2: "Lorem choice ipsum",
    choice3: "Lorem choice ipsum",
    choice4: "Lorem choice ipsum",

    question: "Lorem question ipsum?",
    choice1: "Lorem choice ipsum",
    choice2: "Lorem choice ipsum",
    choice3: "Lorem choice ipsum",
    choice4: "Lorem choice ipsum",

    question: "Lorem question ipsum?",
    choice1: "Lorem choice ipsum",
    choice2: "Lorem choice ipsum",
    choice3: "Lorem choice ipsum",
    choice4: "Lorem choice ipsum",

    question: "Lorem question ipsum?",
    choice1: "Lorem choice ipsum",
    choice2: "Lorem choice ipsum",
    choice3: "Lorem choice ipsum",
    choice4: "Lorem choice ipsum",

    question: "Lorem question ipsum?",
    choice1: "Lorem choice ipsum",
    choice2: "Lorem choice ipsum",
    choice3: "Lorem choice ipsum",
    choice4: "Lorem choice ipsum",


]