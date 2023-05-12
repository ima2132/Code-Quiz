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

function showQuestion(question) {
  console.log(questionContainer); 
  questionContainer.innerHTML = question.question;

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
  

  // questions and answers section (10 questions)
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
        question: "What is the output of the following code:\n\nvar myArray = ['mango', 'dragon fruit', 'strawberry'];\nconsole.log(myArray[1]);",
        choices: ["dragon fruit", "strawberry", "undefined", "mango"],
        answer: "dragon fruit"
      },

      {
        question: "What is the difference between == and === in JavaScript?", 
        choices: ["=== is not a valid operator in JavaScript", "There is no difference", "== compares value and type, while === compares only value", "== compares only value, while === compares value and type"],
        answer: "== compares only value, while === compares value and type"
      }, 

      {
        question: "What is the output of the following code: \n\nvar a = 20; \nvar b = '8'; \nconsole.log(a + b);",
        choices: ["208", "28", "NaN", "Error"],
        answer: "208"
      } 
  ]