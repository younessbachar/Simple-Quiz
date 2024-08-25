const questions = [
    {
        question: "Wich is larget animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Wich is the smallest country in th world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: false},
        ]
    },
    {
        question: "Wich is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antartica", correct: true},
        ]
    },
    {
        question: "Wich is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa ", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-butn");

let currentQuetionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuetionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";

    ShowQuetions();
}

 function ShowQuetions(){
    resetState();
    let currentQuestion = questions[currentQuetionIndex];
    let questionNo = currentQuetionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}
function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = "true";

    });
    nextButton.style.display = "block"
}  

function showScore(){
    resetState();
    questionElement.innerHTML = `You Score ${score} out of ${questions.length}!`;
    nextButton.innerHTML =  "Play Again";
    nextButton.style.display = "block"
}
function handleNextButton(){
    currentQuetionIndex++;
    if(currentQuetionIndex < questions.length){
        ShowQuetions();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuetionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz(); 
