// variables defining spaces to be clicked and syuch
var quizContentEl = document.querySelector("#quiz-container");
var startBtn = document.querySelector('#start-btn');
var message = document.querySelector(".message");
var viewScores = document.querySelector(".view");
var inputDiv = document.querySelector(".inputDiv");
choicesDiv = document.querySelector('.choices');
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
        title: "Which HTML element do we put the Javascript inside of?",
        choices: ["1. <link> ", "2. <javascript> ", "3. <script> ", "4. <js> "],
        answer: "3. <script> "
    },

    {
        title: "How does a for loop start?",
        choices: ["1. for(i=0; i++)", "2. for(i=0; i<5)", "3. for(i=0; i<=5; i++)", "None of the above"],
        answer: "3. for(i=0; i<=5; i++)"
    },

    {
        title: "How can you add a javascript comment?",
        choices: ["1. <!--comment-->", "2. //comment", "3. (comment) ", "4. all of the above"],
        answer: "1. <!--comment-->"
    },

    {
        title: "What keyword is used to define a variable?",
        choices: ["1. variable ", "2. thisVariable", "3. this", "4. var"],
        answer: "4. var"
    },

    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: ["1. alert('Hello World')" , "2. alertBox('Hello World')" , "3. msg('Hello World')", "4. msgBox('Hello World')"],
        answer: "1. alert('Hello World')"
    },

    {
        title: "How to write an IF statement in JavaScript?",
        choices: ["1. if(i===5)", "2. if i == 5", "3. if 5 i then", "4. if i ===5"],
        answer: "1. if(i===5)"
    },

    {
        title: "end",
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
    a4.className = "answer"
    oneWrap.appendChild(a4);
    
    choicesDiv.appendChild(oneWrap);
};

// timer function
var timerAction = function() {
    timer--
    document.getElementById("timer").innerHTML = timer;
    if(timer < 0){
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
        if (questions[questionsIndex].title === "end") {
            clearInterval(quizTimer)
            var timerDisplay = document.getElementById("timer").innerHTML = " ";
            endQuiz();
        }else {
            displayQuestion();
        }

    }else{
        timer -= 10;
        questionsIndex++;
        if (questions[questionsIndex].title === "end") {
            clearInterval(quizTimer)
            var timerDisplay = document.getElementById("timer").innerHTML = " ";
            endQuiz();
        } else {
            var wrong = document.createElement("span")
            wrong.textContent = "Wrong!"
            wrong.className = "wrong"
            message.appendChild(wrong);
            setTimeout(displayQuestion, 1000);
        };

        }
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
    viewHighScores();
};

var viewHighScores = function () {
    // Sorts the stored high scores by highest score //
    var sortedScores = highScores.sort(function(a, b){
        return b.score - a.score;
    });
    // Clears the div where the questions land //
    choicesDiv.innerHTML = " "

    // creates ordered list for High Score items to populate //
    var ol = document.createElement("ol");
    ol.className = "scores-list"
    message.appendChild(ol);

    // for loop populating the high scores list with high scores pulled from local storage //
    for(var i = 0; i < sortedScores.length; i++) {
        var scoresList = document.querySelector(".scores-list")
        var li = document.createElement("li");
        li.textContent = sortedScores[i].initials + " - " + sortedScores[i].score;
        scoresList.appendChild(li);
    };

};

// Event Listeners
message.addEventListener("click", playAgain)
startBtn.addEventListener("click" , firstQuestion);
choicesDiv.addEventListener("click" , checkAnswer);
viewScores.addEventListener("click" , viewHighScores);

