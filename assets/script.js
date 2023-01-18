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
var questionText = document.getElementById("question-text");
var options = document.getElementById("options");
var currentQuestion = 0;
var score = 0;
var quizQuestions = [
   {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: [
         {option: "<script>", answer: true},
         {option: "<scripting>", answer: false},
         {option: "<javascript>", answer: false},
         {option: "<js>", answer: false}
      ]
   },
   {
      question: "How do you write 'Hello World' in an alert box?",
      answers: [
         {option: "msg('Hello World');", answer: false},
         {option: "alertBox('Hello World');", answer: false},
         {option: "msgBox('Hello World');", answer: false},
         {option: "alertBox('Hello World');", answer: true}
      ]  
   },
   {
      question: "How does a FOR loop start?",
      answers: [
         {option: "for i = 1 to 5", answer: false},
         {option: "for (i <= 5; i++)", answer: false},
         {option: "for (i = 0; i <=5; i++)", answer: true},
         {option: "for (i = 0; i <= 5)", answer: false}
      ]  
   },
   {
      question: "What is the correct way to write a JavaScript array?",
      answers: [
         {option: "var colors = (1: 'red', 2: 'green', 3: 'blue')", answer: false},
         {option: "var colors = ['red', green', 'blue']", answer: true},
         {option: "var colors = 'red', 'green', 'blue'", answer: false},
         {option: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", answer: false}
      ]  
   },
   {
      question: "How do you round the number 7.25 to the nearest integer?",
      answers: [
         {option: "Math.rnd(7.25)", answer: false},
         {option: "round(7.25)", answer: false},
         {option: "Math.round(7.25)", answer: true},
         {option: "rnd(7.25)", answer: false}
      ]  
   }
]

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

   presentQuestion();
   startTimer();
}

function presentQuestion() {
   questionText.innerHTML = quizQuestions[currentQuestion].question;

   options.innerHTML = "";
   for (var i = 0; i < 4; i ++) {
      
      var li = document.createElement("li");
      li.setAttribute("data-index", i);
      

      var button = document.createElement("button");
      button.textContent = index + ". " + quizQuestions[currentQuestion].answers[i];

      li.appendChild(button);
      options.appendChild(li);
   }

}

  
// When click on answer
options.addEventListener('click', checkAnswer);
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