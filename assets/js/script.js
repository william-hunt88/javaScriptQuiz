// variables defining spaces to be clicked and syuch
var quizContentEl = document.querySelector("#quiz-container");
var startBtn = document.querySelector('#start-btn');
var message = document.querySelector(".message");
timer = 60
highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];  
score = 0;
choicesDiv = document.querySelector('.choices')
var questionsIndex = 0;


var questions = [
    {
        title: "Arrays in Javascript can be used to store what types of data?",
        choices: ["1. objects" , "2. strings" , "3. integers" , "4. all of the above"],
        answer: "4. all of the above"
    },

    {
        title: "A javascript function should be enclosed with which of the following?",
        choices: ["1. { } ", "2. ( )", "3. < > ", "4. [ ] "],
        answer: " 1. { } "
    },
];


// first Question function
var firstQuestion = function () {
    // start timer
    window.setInterval(timerAction, 1000);
    // create a variable to represent the initial quiz message 
    var initMessage = document.querySelector('#quiz-description')
    // removes initial quiz message, making room for first question
    initMessage.remove();
    startBtn.remove();
    displayQuestion();
};

var displayQuestion = function () {
    choicesDiv.innerHTML = " ";
    if(questions[questionsIndex] === "undefined") {
        quizEnd();
    };
    var oneWrap = document.createElement("div");
    oneWrap.className = "oneWrap";
    message.innerHTML = ""
    
    var q1 = document.createElement("h2");
    q1.textContent = questions[questionsIndex].title;
    q1.className = "question";
    oneWrap.appendChild(q1);
    
    var a1 = document.createElement("button");
    a1.textContent = questions[questionsIndex].choices[0];
    a1.className = "answer";
    oneWrap.appendChild(a1);
    
    var a2 = document.createElement("button");
    a2.textContent = questions[questionsIndex].choices[1];
    a2.className = "answer";
    oneWrap.appendChild(a2);
    
    var a3 = document.createElement("button");
    a3.textContent = questions[questionsIndex].choices[2];
    a3.className = "answer";
    oneWrap.appendChild(a3);
    
    var a4 = document.createElement("button");
    a4.textContent = questions[questionsIndex].choices[3];
    a4.className = "correct-answer"
    oneWrap.appendChild(a4);
    
    choicesDiv.appendChild(oneWrap);
};


var secondQuestion = function(){
    var oneWrap = document.querySelector(".oneWrap");
    var wrong = document.querySelector(".wrong");
    oneWrap.remove();
    
    var twoWrap = document.createElement("div");
    twoWrap.className = "twoWrap";

    var q2 = document.createElement("h2");
    q2.textContent = "A javascript function should be enclosed with which of the following?"
    q2.className = "question"
    twoWrap.appendChild(q2);

    var a1 = document.createElement("button")
    a1.textContent = " { } "
    a1.className = "correct-answer"
    twoWrap.appendChild(a1);

    var a2 = document.createElement("button")
    a2.textContent = " ( ) ";
    a2.className = "answer";
    twoWrap.appendChild(a2);

    var a3 = document.createElement("button")
    a3.textContent = " [ ] ";
    a3.className = "answer";
    twoWrap.appendChild(a3);

    var a4 = document.createElement("button")
    a4.textContent = " < > ";
    a4.className = "answer";
    twoWrap.appendChild(a4);

    choicesDiv.appendChild(twoWrap);
 
};

// timer function
var timerAction = function() {
    timer--
    document.getElementById("timer").innerHTML = timer;
    if(timer < 0){
        var timerDisplay = document.getElementById("timer").innerHTML = 0;
        timerDisplay.className = "timerDisplay";
        localStorage.setItem("HighScore" , "score")
    };
};

var checkAnswer = function (event) {
    targetEl = event.target;
    console.log(targetEl);
    questionsIndex++;
    
    if(targetEl.textContent === questions[questionsIndex].answer) {
        score++
        displayQuestion();
    }else{
        timer -= 10;
        var wrong = document.createElement("span")
        wrong.textContent = "Wrong!"
        wrong.className = "wrong"
        message.appendChild(wrong);
        setTimeout(displayQuestion, 1000);
    };
};

// quizEnd - create input element 
           // - grab value for local storage
           // show score
           // create an object for high score and initials 
           // push that pobject to high scores array
           // set local storage for array - stringify JSON.stringify
           // get local storage for all highScores and display it on page with <ol> 



// Event Listeners
startBtn.addEventListener("click" , firstQuestion);
choicesDiv.addEventListener("click" , checkAnswer)






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