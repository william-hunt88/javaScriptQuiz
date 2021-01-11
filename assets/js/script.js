// variables defining spaces to be clicked and syuch
var quizContentEl = document.querySelector("#quiz-container");
var startBtn = document.querySelector('#start-btn');
console.log(startBtn);
timer = 60


// first Question function
var firstQuestion = function () {
    // start timer
    window.setInterval(timerAction, 1000);
    // create a variable to represent the initial quiz message 
    var initMessage = document.querySelector('#quiz-description')
    // removes initial quiz message, making room for first question
    initMessage.remove();
    startBtn.remove();

    //create DOM element for actual question
    var q1 = document.createElement("h2");
    q1.textContent = "Arrays in Javascript can be used to store what types of data?"
    q1.className = "question";
    quizContentEl.appendChild(q1);

    var a1 = document.createElement("button");
    a1.textContent = "a";
    a1.className = "answer";
    quizContentEl.appendChild(a1);
};

// timer function
var timerAction = function() {
    timer--
    console.log(timer);
    document.getElementById("timer").innerHTML = timer;

}









// Event Listeners
startBtn.addEventListener("click" , firstQuestion);





// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers - GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score