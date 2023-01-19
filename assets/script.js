// Declare variables
// Timer
var timeEl = document.getElementById("timer");
var secondsLeft = 30;
// Buttons
var startBtn = document.getElementById("start-button");
var submitBtn = document.getElementById("submit-button");
var goBackBtn = document.getElementById("go-back-button");
var clearBtn = document.getElementById("clear-button");
// Home section
var homeSection = document.querySelector(".home-section");
// Quiz section
var quizSection = document.querySelector(".quiz-section");
var questionText = document.getElementById("question-text");
var options = document.getElementById("options");
var currentQuestion = 0;
var score = 0;
var quizQuestions = [
   {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: [
         { option: "<script>" },
         { option: "<scripting>" },
         { option: "<javascript>" },
         { option: "<js>" }
      ],
      correct: "1. <script>"
   },
   {
      question: "How do you write 'Hello World' in an alert box?",
      answers: [
         { option: "msg('Hello World');" },
         { option: "alertBox('Hello World');" },
         { option: "msgBox('Hello World');" },
         { option: "alert('Hello World');" }
      ],
      correct: "4. alert('Hello World');"
   },
   {
      question: "How does a FOR loop start?",
      answers: [
         { option: "for i = 1 to 5" },
         { option: "for (i <= 5; i++)" },
         { option: "for (i = 0; i <=5; i++)" },
         { option: "for (i = 0; i <= 5)" }
      ],
      correct: "3. for (i = 0; i <=5; i++)"
   },
   {
      question: "How do you find the number with the highest value of x and y?",
      answers: [
         { option: "top(x, y)" },
         { option: "Math.max(x, y)" },
         { option: "Math.ceil(x, y)" },
         { option: "ceil(x,y)" }
      ],
      correct: "2. Math.max(x, y)"
   },
   {
      question: "How do you round the number 7.25 to the nearest integer?",
      answers: [
         { option: "Math.rnd(7.25)" },
         { option: "round(7.25)" },
         { option: "Math.round(7.25)" },
         { option: "rnd(7.25)" }
      ],
      correct: "3. Math.round(7.25)"
   }
]
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");
var feedback = document.getElementById("feedback");
// Final section
var finalSection = document.querySelector(".final-section");
var finalText = document.getElementById("final-text")
var finalScore = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var score = 0;
// Leaderboard section
var leaderboardSection = document.querySelector(".leaderboard-section");
var leaderboardTable = document.getElementById("leaderboard-table");


// When click on start button
startBtn.addEventListener('click', startQuiz);

// Timer starts
function startTimer() {
   var timerInterval = setInterval(function () {
      secondsLeft--;
      timeEl.textContent = secondsLeft;

      if (secondsLeft === 0) {
         clearInterval(timerInterval);
         endQuiz();
         finalText.textContent = "You're out of time!"
      }
   }, 1000);
}
// First question is presented
function startQuiz() {
   homeSection.style.display = "none";
   quizSection.style.display = "block";

   presentQuestion();
   startTimer();
}

function presentQuestion() {
   questionText.innerHTML = quizQuestions[currentQuestion].question;

   options.innerHTML = "";
   for (var i = 0; i < 4; i++) {

      var li = document.createElement("li");
      li.setAttribute("data-index", i);

      var button = document.createElement("button");
      button.textContent = (i + 1) + ". " + quizQuestions[currentQuestion].answers[i].option;

      li.appendChild(button);
      options.appendChild(li);
   }
}

// When click on answer
options.addEventListener('click', nextQuestion);

// Next question is presented
function nextQuestion(event) {

   var selectedAnswer = event.target.textContent;
   var correctAnswer = quizQuestions[currentQuestion].correct;

   // Correct or wrong answer is displayed below answer options
   if (selectedAnswer == correctAnswer) {
      score = score + 5;
      feedback.textContent = "Correct!"
   }
   else {
      secondsLeft = secondsLeft - 5;
      feedback.textContent = "Wrong!"
   }

   currentQuestion++;
   if (currentQuestion < quizQuestions.length) {
      presentQuestion()
   }
   else {
      endQuiz();
   }
}

// When aswer five questions OR timer reaches zero
function endQuiz() {
   clearTimeout(secondsLeft);
   // Page with final score is displayed
   // Page with initials input and submit button displayed
   quizSection.style.display = "none";
   finalSection.style.display = "block";
   finalText.textContent = "All done!";

   // Final score equals correct answers + time remaining
   finalScore.textContent = "Your final score is " + score + secondsLeft;
}
// Timer stop

// When click submit button
submitBtn.addEventListener("click", function (event) {
   event.preventDefault();

   var leaderboardInput = {
      score: score,
      initials: initialsInput.value.trim()
   }
   // Initials and score saved
   localStorage.setItem("leaderboardInput", JSON.stringify(leaderboardInput));

   // High scores page with name and score is displayed
   displayLeaderboard();

});

// When go to leaderboard section
function displayLeaderboard() {
   // High scores page with name and score is displayed
   // Go back button is displayed
   // Clear high score button is displayed
   finalSection.style.display = "none";
   leaderboardSection.style.display = "block"

   renderLeaderboard();
}
function renderLeaderboard() {
   var leaderboard = JSON.parse(localStorage.getItem("leaderboardInput"));

   for (var i = 0; i < leaderboard.length; i++) {

      var rank = document.createElement('td');
      rank.textContent = (i + 1);
      var score = document.createElement('td');
      score.textContent = score;
      var initials = document.createElement("td");
      initials.textContent = initials;
      var trEl = document.createElement("tr");
      trEl.appendChild(rank);
      trEl.appendChild(score);
      trEl.appendChild(initials);

      leaderboardTable.appendChild(trEl);
   }
}
// When click on go back button
// Go to start quiz page

// When click on clear high score button
clearBtn.addEventListener('click', clearLeaderboard);
   // High score info is erased
function clearLeaderboard() {
   localStorage.setItem("leaderboardInput", []);
   while (leaderboardTable.children.length >1) {
      leaderboardTable.removeChild(leaderboardTable.lastChild);
   }
}
// When click on view high scores link in nav menu
   // High scores page with name and score is displayed