// Declare variables
// Timer
var timeEl = document.getElementById("timer");
var secondsLeft = 30;
var timerInterval;
// Buttons
var startBtn = document.getElementById("start-button");
var submitBtn = document.getElementById("submit-button");
var goBackBtn = document.getElementById("go-back-button");
var clearBtn = document.getElementById("clear-button");
// Home section
var homeSection = document.querySelector(".home-section");
var viewLeaderboard = document.getElementById("view-leaderboard");
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
var initialsForm = document.getElementById("initials-form");
var initialsInput = document.getElementById("initials").value;
var finalScoreValue = 0;
var score = 0;
// Leaderboard section
var leaderboardSection = document.querySelector(".leaderboard-section");
var leaderboardList = document.getElementById("leaderboard-list");


// When click on start button
startBtn.addEventListener('click', startQuiz);

// Timer starts
function startTimer() {
   timerInterval = setInterval(function () {
      secondsLeft--;
      timeEl.textContent = secondsLeft;

      // Timer stops
      if (secondsLeft <= 0) {
         clearInterval(timerInterval);
         secondsLeft = 0;
         endQuiz();
         finalText.textContent = "You're out of time!"
      }

      if (currentQuestion === quizQuestions.length) {
         clearInterval(timerInterval);
      }
   }, 1000);
}

// First question is presented
function startQuiz() {
   homeSection.style.display = "none";
   quizSection.style.display = "block";
   secondsLeft = 30;

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
      score = score - 5;
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
   // clearTimeout(secondsLeft);
   clearInterval(timerInterval);
   // Page with final score is displayed
   // Page with initials input and submit button displayed
   quizSection.style.display = "none";
   finalSection.style.display = "block";
   finalText.textContent = "All done!";
   currentQuestion = 0;

   // Final score equals correct answers + time remaining

   if ((score + secondsLeft) < 0) {
      finalScore.textContent = "Your final score is 0";
      finalScoreValue = 0;
   }
   else {
      finalScore.textContent = "Your final score is " + (score + secondsLeft);
      finalScoreValue = (score + secondsLeft);
   }
}

// When click submit button
submitBtn.addEventListener('click', getInput);

function getInput(event) {
   event.preventDefault();

   initialsInput = document.getElementById("initials").value;
   if (initialsInput === "") {
      window.alert("Please input your initials");
      return;
   };

   initialsForm.reset();

   var leaderboardInput = {
      initials: initialsInput.trim(),
      score: finalScoreValue
   };

   var lastScore = JSON.parse(localStorage.getItem("leaderboardInput"));

   if (lastScore == undefined) {
      lastScore = [leaderboardInput];
   }
   else {
      lastScore.push(leaderboardInput)
   }

   localStorage.setItem("leaderboardInput", JSON.stringify(lastScore));
   displayLeaderboard();
}

// When go to leaderboard section
function displayLeaderboard() {
   // High scores page with name and score is displayed
   // Go back button is displayed
   // Clear high score button is displayed
   homeSection.style.display = "none";
   finalSection.style.display = "none";
   quizSection.style.display = "none";
   leaderboardSection.style.display = "block";

   leaderboardList.innerHTML = "";

   var lastScore = JSON.parse(localStorage.getItem("leaderboardInput"));

   for (var i = 0; i < lastScore.length; i++) {

      var leaderboardLiEl = document.createElement("li");
      leaderboardLiEl.textContent = lastScore[i].score + " - " + lastScore[i].initials;
      leaderboardList.appendChild(leaderboardLiEl);
   }
}

// When click on go back button
goBackBtn.addEventListener('click', displayHome);

// Go to start quiz page
function displayHome() {
   homeSection.style.display = "block";
   finalSection.style.display = "none";
   leaderboardSection.style.display = "none";
}

// When click on clear high score button
clearBtn.addEventListener('click', clearLeaderboard);
// High score info is erased
function clearLeaderboard() {
   localStorage.clear();
}
// When click on view high scores link in nav menu
// High scores page with name and score is displayed
viewLeaderboard.addEventListener("click", displayLeaderboard);