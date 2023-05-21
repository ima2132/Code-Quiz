// put references to the elements on the page
var startButton = document.getElementById("start-btn");
var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var timeElement = document.getElementById("time");
var promptElement = document.getElementById("prompt");
var scoreContainer = document.getElementById("score");
var initialsInput = document.getElementById("initial");
var showScoreButton = document.getElementById("show-score");
var scoresElement = document.getElementById("scores");
var finalContainer = document.getElementById("final");
var restartButton = document.getElementById("restart");

var shuffledQuestions;
var timerInterval;

// setting initial values 
var currentQuestion = 0;
var score = 0;
var timeLeft = 90;

// questions and answers section (8 questions)
  var questions = [
    {
      question: "What does the acronym DOM stand for in web development?",
      choices: ["Data Object Model", "Development Object Method", "Document Object Model", "Display Object Management"],
      answer: "Document Object Model"
    },

    {
      question: "What keyword is used to declare a variable in JavaScript?",
      choices: ["var", "const", "let", "All of the above"],
      answer: "All of the above"
    },

    {
      question: "Which of the following loops executes at lease once?",
      choices: ["for loop", "if statement", "do...while loop", "while loop"],
      answer: "do...while loop"
    }, 

    {
      question: "Which operator is used for strict equality comparison in JavaScript?",
      choices: ["!=", "===", "!==", "=="],
      answer: "==="
    },

    {
      question: "Which of the following is NOT a primitive data type in JavaScript?",
      choices: ["Object", "Boolean", "String", "Number"], 
      answer: "Object"
    }, 

    {
      question: "What is the purpose of a function in JavaScript?",
      choices: ["To create variables", "To create if-else statements", "To create loops", "To use reusable blocks of code"],
      answer: "To use reusable blocks of code"
    },

    {
      question: "Which of the following is NOT a valid JavaScript variable name?", 
      choices: ["my_name", "_name", "310name", "$name"],
      answer: "310name"
    }, 

    {
        question: "What is the output of the following code: \n\nvar a = 20; \nvar b = '8'; \nconsole.log(a + b);",
        choices: ["208", "28", "NaN", "Error"],
        answer: "208"
    }, 
  ]

  // added event listener for start button, show score, and restart quiz 
  startButton.addEventListener("click", startQuiz);
  showScoreButton.addEventListener("click", showScore);
  restartButton.addEventListener("click", restartQuiz);
  
  function startQuiz() {
    startButton.classList.add("hide");
    promptElement.classList.add("hide");
    questionContainer.classList.remove("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    showQuestion();
    timerInterval = setInterval(function () {
      timeLeft--;
      timeElement.textContent = timeLeft;
      if (timeLeft <= 0 || currentQuestion === questions.length) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }

  // function to show question 
  function showQuestion() {
    resetState();
    var currentQuizQuestion = shuffledQuestions[currentQuestion];
    questionElement.textContent = currentQuizQuestion.question;
    currentQuizQuestion.choices.forEach(function (choice) {
      var button = document.createElement("button");
      button.classList.add("btn");
      button.textContent = choice;
      button.addEventListener("click", function () {
        if (choice === currentQuizQuestion.answer) {
          score++;
        } else {
          timeLeft -= 10;
        }
        currentQuestion++;
        if (currentQuestion === questions.length) {
          endQuiz();
        } else {
          showQuestion();
        }
      });
      answerButtons.appendChild(button);
    });
  }

  function resetState() {
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  // ends quiz 
  function endQuiz() {
    questionContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
  }
  
// captures the user's initials and adds initials/score to the highScores array
function showScore() {
  var initials = initialsInput.value.trim();
  if (initials !== "") {
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push({ initials: initials, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayCurrentScore(initials, score);
    displayScores();
  }
}

function displayCurrentScore(initials, score) {
  var currentScoreElement = document.getElementById("current-score");
  currentScoreElement.textContent = initials + " - " + score;
}
  
// displays scores by retrieving them from the local storage
  function displayScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    scoresElement.innerHTML = "";
    highScores.forEach(function (entry) {
      var scoreEntry = document.createElement("p");
      scoreEntry.textContent = entry.initials + " - " + entry.score;
      scoresElement.appendChild(scoreEntry);
    });
    finalContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
  }

// function to restart quiz 
  function restartQuiz() {
    timeLeft = 90;
    score = 0;
    currentQuestion = 0;
    startButton.classList.remove("hide");
    promptElement.classList.remove("hide");
    finalContainer.classList.add("hide");
    startQuiz();  
  }




