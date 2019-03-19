let preQuestions;

fetch('https://quiztai.herokuapp.com/api/quiz')
    .then(resp => resp.json())
    .then(resp => {
        preQuestions = resp;
        setQuestion(index);
    });



let question = document.querySelector(".question");
let answers = document.querySelectorAll(".list-group-item");
let next = document.querySelector(".next");
let previous = document.querySelector(".previous");
let score = document.querySelector(".score");
let list = document.querySelector(".list");
let results = document.querySelector(".results");
let userScorePoint = document.querySelector(".userScorePoint");
let average = document.querySelector(".average");
let restart = document.querySelector(".restart");
let index = 0;
let points = 0;

next.addEventListener('click', nextQuestion);
previous.addEventListener('click', previousQuestion);
restart.addEventListener('click', restartQuiz);



function setQuestion(index) {
    question.innerHTML = (index + 1) + ". " + preQuestions[index].question;

    answers[0].innerText = preQuestions[index].answers[0];
    answers[0].style.backgroundColor = "white";
    answers[1].innerText = preQuestions[index].answers[1];
    answers[1].style.backgroundColor = "white";

    answers[0].addEventListener('click', checkAnswer);
    answers[1].addEventListener('click', checkAnswer);
    if (preQuestions[index].answers.length === 4){
        answers[2].style.display = "block";
        answers[3].style.display = "block";

        answers[2].innerText = preQuestions[index].answers[2];
        answers[2].style.backgroundColor = "white";
        answers[3].innerText = preQuestions[index].answers[3];
        answers[3].style.backgroundColor = "white";

        answers[2].addEventListener('click', checkAnswer);
        answers[3].addEventListener('click', checkAnswer);
    } else {
        answers[2].style.display = "none";
        answers[3].style.display = "none";
    }
}

function nextQuestion(event) {
    if (index < 19) {
        index += 1;
        setQuestion(index);
    } else {
        if (localStorage.getItem("quizCounter") === null){
            localStorage.setItem("quizCounter", "1");
            localStorage.setItem("average", JSON.stringify(points));
        } else {
            let quizCounter = localStorage.getItem("quizCounter");
            quizCounter = parseInt(quizCounter);
            quizCounter += 1;
            localStorage.setItem("quizCounter", JSON.stringify(quizCounter));
            let average = localStorage.getItem("average");
            average = parseInt(average);
            average = (average + points) / 2;
            localStorage.setItem("average", JSON.stringify(average));
        }
        list.style.display = "none";
        results.style.display = "block";
        userScorePoint.innerHTML = points;
        average.innerHTML = localStorage.getItem("average");
    }

}

function previousQuestion(event) {
   if (index > 0) {
       index -= 1;
       setQuestion(index);
   }
}

function checkAnswer(event) {
    if (preQuestions[index].correct_answer === event.srcElement.innerText){
        event.srcElement.style.backgroundColor = "green";
        points += 1;
        score.innerText = points;
    } else {
        event.srcElement.style.backgroundColor = "red";
        for (let i = 0; i < answers.length; i++){
            if (answers[i].innerText === preQuestions[index].correct_answer){
                answers[i].style.backgroundColor = "green";
            }
        }
    }

    setTimeout(function () {
        nextQuestion();
    },3000);

}

function restartQuiz(event) {
    index = 0;
    points = 0;
    results.style.display = "none";
    list.style.display = "block";
    setQuestion(index);
    score.innerHTML = "0";

}
