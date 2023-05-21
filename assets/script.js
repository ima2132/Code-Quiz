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

// added result element
var resultElement = document.getElementById("result");
questionContainer.appendChild(resultElement);

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
        resultElement.textContent = "Correct!";
        resultElement.style.color = "green";
      } else {
        timeLeft -= 10;
        resultElement.textContent = "Wrong!";
        resultElement.style.color = "red";
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
  questionElement.classList.add("hide");
  answerButtons.classList.add("hide");
  resultElement.classList.add("hide");
}
 

function displayCurrentScore(initials, score) {
  var currentScoreElement = document.getElementById("current-score");
  currentScoreElement.textContent = initials + " - " + score;
}

function showScore() {
  var initials = initialsInput.value.trim();
  if (initials !== "") {
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push({ initials: initials, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayCurrentScore(initials, score);
    displayScores();
    showScoreButton.classList.add("hide");  // hides the "Show Score" button after showing the score
    initialsInput.classList.add("hide");    // hides the input field after showing the score
    document.getElementById("times-up").classList.add("hide"); // hides "Time's Up!"
    document.getElementById("enter-initials-prompt").classList.add("hide"); // hides "Please enter your initials to view your score."
  }
}


// displays scores by retrieving them from the local storage
function displayScores() {
  var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
  highScores.sort((a, b) => b.score - a.score);  // Sort scores from highest to lowest
  scoresElement.innerHTML = "";
  highScores.forEach(function (entry) {
    var scoreEntry = document.createElement("p");
    scoreEntry.textContent = entry.initials + " - " + entry.score;
    scoresElement.appendChild(scoreEntry);
  });
  finalContainer.classList.remove("hide");  // shows the "Restart Quiz" button after showing the score
}


function restartQuiz() {
  location.reload(); // reloads the page to start the quiz from the beginning
}

// info to clear scores 
var clearScoresButton = document.getElementById("clear-scores");
clearScoresButton.addEventListener("click", clearScores);

function clearScores() {
    localStorage.removeItem("highScores");  // clears the scores from local storage
    scoresElement.innerHTML = "";  // clears the scores from the page
}
