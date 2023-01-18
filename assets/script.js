// Declare variables
// Timer
var timeEl = document.getElementById("timer");
var secondsLeft = 30;
// Buttons
var startBtn = document.getElementById("start-button");
// Home section
var homeSection = document.querySelector(".home-section");
// Quiz section
var quizSection = document.querySelector(".quiz-section");

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
      }
   }, 1000);
}
// First question is presented
function startQuiz() {
   homeSection.style.display = "none";
   quizSection.style.display = "block";

   startTimer();
   
}

  
// When click on answer
   // Next question is presented
   // Correct or wrong answer is displayed below answer options

// If anser incorrectly
   // Time subtracts from the clock

// When aswer five questions OR timer reaches zero
   // Page with final score is displayed
   // Final score equals time remaining
   // Page with initials input and submit button displayed
   // Date is saved

// When click submit button
   // High scores page with name and score is displayed
   // Go back button is displayed
   // Clear high score button is displayed

// When click on go back button
   // Go to start quiz page

// When click on clear high score button
   // High score info is erased

// When click on view high scores link in nav menu
   // High scores page with name and score is displayed