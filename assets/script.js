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
