// variables defining spaces to be clicked and syuch
var quizContentEl = document.querySelector("#quiz-container");
var startBtn = document.querySelector('#start-btn');
var message = document.querySelector(".message");
var viewScores = document.querySelector(".view")
choicesDiv = document.querySelector('.choices')
highScores = JSON.parse(window.localStorage.getItem("highScores")) || []; 
timer = 60
score = 0;
var questionsIndex = 0;
var quizTimer = setInterval(timerAction, 1000);

var questions = [
    {
        title: "Arrays in Javascript can be used to store what types of data?",
        choices: ["1. objects" , "2. strings" , "3. integers" , "4. all of the above"],
        answer: "4. all of the above"
    },

    {
        title: "A javascript function should be enclosed with which of the following?",
        choices: ["1. { } ", "2. ( )", "3. < > ", "4. [ ] "],
        answer: "1. { } "
    },

    {
        title: "An if statement condition shall be surrounded by which of the following",
        choices: ["1. { } ", "2. ( )", "3. < > ", "4. [ ] "],
        answer: "2. ( )"
    },

    {
        title: "An if statement condition shall be surrounded by which of the following",
        choices: ["1. { } ", "2. ( )", "3. < > ", "4. [ ] "],
        answer: "2. ( )"
    },

    {
        title: "An if statement condition shall be surrounded by which of the following",
        choices: ["1. { } ", "2. ( )", "3. < > ", "4. [ ] "],
        answer: "2. ( )"
    },

    {
        title: "An if statement condition shall be surrounded by which of the following",
        choices: ["1. { } ", "2. ( )", "3. < > ", "4. [ ] "],
        answer: "2. ( )"
    },

    {
        title: "An if statement condition shall be surrounded by which of the following",
        choices: ["1. { } ", "2. ( )", "3. < > ", "4. [ ] "],
        answer: "2. ( )"
    },

    {
        title: "An if statement condition shall be surrounded by which of the following",
        choices: ["1. { } ", "2. ( )", "3. < > ", "4. [ ] "],
        answer: "2. ( )"
    },

    {
        title: "An if statement condition shall be surrounded by which of the following",
        choices: ["1. { } ", "2. ( )", "3. < > ", "4. [ ] "],
        answer: "2. ( )"
    },

    
];


// first Question function
var firstQuestion = function () {
    // start timer
    quizTimer = setInterval(timerAction, 1000);

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

// timer function
var timerAction = function() {
    timer--
    document.getElementById("timer").innerHTML = timer;
    if(timer === 0 || questions[questionsIndex] === undefined){
        var timerDisplay = document.getElementById("timer").innerHTML = 0;
        timerDisplay.className = "timerDisplay";
        clearInterval(quizTimer);
        endQuiz();
    };
};

var checkAnswer = function (event) {
    targetEl = event.target;
    
    if(targetEl.textContent === questions[questionsIndex].answer) {
        score++
        questionsIndex++;
        console.log(score);
        displayQuestion();
    }else{
        timer -= 10;
        questionsIndex++;
        var wrong = document.createElement("span")
        wrong.textContent = "Wrong!"
        wrong.className = "wrong"
        message.appendChild(wrong);
        setTimeout(displayQuestion, 1000);
    };
};


var endQuiz = function () {
    //removes any remaining active quiz content
    choicesDiv.remove();

    // creates a container element for initals grab
    var inputDiv = document.createElement("div")
    inputDiv.className = "inputDiv"
    quizContentEl.appendChild(inputDiv);
    
    //creates an input element for high scores initials
    var initialsInput = document.createElement("INPUT")
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("placeholder", "your initials plz");
    initialsInput.className = "input"

    // creates a span element to display your score
    var revealedScore = document.createElement("span")
    revealedScore.textContent = "Your score is " + score;
    revealedScore.className = "your-score";

    // creates a button element to submit the initials
    var submitBtn = document.createElement("button");
    submitBtn.textContent = "Save";
    message.appendChild(submitBtn);

    // appends each of these elements to a div 
    message.appendChild(revealedScore);
    message.appendChild(initialsInput);
    message.appendChild(submitBtn);
};


var playAgain = function(event) {
    targetEl = event.target;
    inputContent = document.querySelector(".input").value;
    if(targetEl.textContent === "Save"){
        console.log("lineCheck");
        var thisScore = score + inputContent;
        highScores.push({
            initials: inputContent,
            score: score
        });
        saveScores();
    }
};

var saveScores = function () {
    localStorage.setItem("highScores" , JSON.stringify(highScores));
    debugger;
    viewHighScores();
};

var viewHighScores = function () {
    var sortedScores = highScores.sort(function(a, b){
        return b.score - a.score;
    });
    choicesDiv.innerHTML = " "
    for(var i = 0; i < sortedScores.length; i++) {
        var ol = document.createElement("ol");
        ol.className = "scores-list"
        message.appendChild(ol);
        var scoresList = document.querySelector(".scores-list")
        var li = document.createElement("li");
        console.log(highScores)
        li.textContent = sortedScores[i].initials + " - " + sortedScores[i].score;
        scoresList.appendChild(li);
    }

};

// quizEnd - create input element 
           // - grab value for local storage
           // show score
           // create an object for high score and initials 
           // push that pobject to high scores array
           // set local storage for array - stringify JSON.stringify
           // get local storage for all highScores and display it on page with <ol> 



// Event Listeners
message.addEventListener("click", playAgain)
startBtn.addEventListener("click" , firstQuestion);
choicesDiv.addEventListener("click" , checkAnswer);
viewScores.addEventListener("click" , viewHighScores);






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