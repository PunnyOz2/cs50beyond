const questions = [
    {
        question: "Nitrogenous base that occurs in RNA but not in DNA",
        options: ["Deoxyribose", "Ribose", "Uracil", "Cytosine", "Thymine"],
        answer: "Uracil"
    },
    {
        question: "Sugar that occurs in DNA but not in RNA",
        options: ["Deoxyribose", "Ribose", "Uracil", "Cytosine","Thymine"],
        answer: "Deoxyribose"
    },
    {
        question: "A nitrogenous base that occurs in DNA in equal quantities with guanine",
        options: ["Deoxyribose", "Ribose", "Uracil", "Cytosine","Thymine"],
        answer: "Cytosine"
    }
];

// let question_number = 0;
// let correct = 0;
if(!localStorage.getItem("question_number")){
    localStorage.setItem("question_number", 0);
}
if(!localStorage.getItem("correct")){
    localStorage.setItem("correct", 0);
}

document.addEventListener("DOMContentLoaded", () => {
    load_question();
});

function load_question() {

    let question_number = localStorage.getItem("question_number");
    let correct = localStorage.getItem("correct");
    document.querySelector("#correct").innerHTML = `${correct} of ${question_number}`
    question_number/=1;
    correct/=1;
    if (question_number >= questions.length) {
        prompt_restart();
        return;
    }
    
    document.querySelector("#question").innerHTML = questions[question_number].question;

    const options = document.querySelector("#options");
    options.innerHTML = "";
    for (const option of questions[question_number].options) {
        options.innerHTML += `<button class="option">${option}</button>`;
    }
    document.querySelectorAll(".option").forEach(option => {
        option.onclick = () => {
            if (option.textContent == questions[question_number].answer) {
                correct++;
            }
            localStorage.setItem("question_number",question_number+1);
            localStorage.setItem("correct", correct);
            load_question();
        }
    })
}
function prompt_restart() {
    document.querySelector("#question").innerHTML = "Quiz done!";
    const options = document.querySelector("#options");
    options.innerHTML = `<button onclick="restart()">Restart</button>`;
}
function restart() {
    localStorage.setItem("question_number",0);
    localStorage.setItem("correct", 0);
    document.querySelector("#correct").innerHTML = "0 of 0"
    questions.forEach(question => {
        shuffle(question.options);
    })
    load_question();
}
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}