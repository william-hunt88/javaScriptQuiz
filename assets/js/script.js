// variables defining spaces to be clicked and syuch
var quizContentEl = document.querySelector("#quiz-container");
var startBtn = document.querySelector('#start-btn');
console.log(startBtn);
timer = 60
highScores = [];
score = 0;


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
    a1.textContent = "1. objects";
    a1.className = "answer";
    quizContentEl.appendChild(a1);

    var a2 = document.createElement("button");
    a2.textContent = "2. strings";
    a2.className = "answer";
    quizContentEl.appendChild(a2);

    var a3 = document.createElement("button");
    a3.textContent = "3. integers";
    a3.className = "answer";
    quizContentEl.appendChild(a3);

    var a4 = document.createElement("button");
    a4.textContent = "4. all of the above"
    a4.className = "correct-answer"
    quizContentEl.appendChild(a4);
};

// timer function
var timerAction = function() {
    timer--
    document.getElementById("timer").innerHTML = timer;
    if(timer < 0){
        document.getElementById("timer").innerHTML = 0;
        window.alert("You're out of time");
    };
};

var checkAnswer = function (event) {
    console.log("boobs");
    targetEl = event.target;
    wrong = document.querySelector(".answer");

    if(targetEl.matches(".correct-answer")) {
        score++
        highScores.push(score);
        console.log(highScores);
    };

};









// Event Listeners
startBtn.addEventListener("click" , firstQuestion);
quizContentEl.addEventListener("click" , checkAnswer)





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