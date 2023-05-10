// setting initial values 
var currentQuestion = 0;
var score = 0;
var timeLeft = 60;

// put references to the elements on the page
var startButton = document.getElementById("start-btn");
var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var timeElement = document.getElementById("time");

// added event listener to the start button
startButton.addEventListener("click", startQuiz);

// added function to start the quiz
function startQuiz() {
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  showQuestion();
  var timerInterval = setInterval(function() {
    timeLeft--;
    timeElement.textContent = "Time: " + timeLeft;
    if (timeLeft === 0 || currentQuestion === questions.length) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// added function to show question and answer choices
function showQuestion() {
    resetState();
    questionElement.textContent = questions[currentQuestion].question;
    questions[currentQuestion].choices.forEach(function(choice, i) {
      var button = document.createElement("button");
      button.classList.add("btn");
      button.textContent = choice;
      button.addEventListener("click", function() {
        if (choice === questions[currentQuestion].answer) {
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

  // added function to reset answer choices
function resetState() {
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  // added function to end quiz
function endQuiz() {
    questionContainer.classList.add("hide");
    var initials = prompt("Enter your initials:");
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push({ initials: initials, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
  }
  