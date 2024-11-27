// const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
 // const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
   // return new bootstrap.Tooltip(tooltipTriggerEl);

   const questions = [
    {
      question: "hew̓ít",
      options: [
        { text: "Dog", correct: false},
        { text: "Bear", correct: false},
        { text: "Raven", correct: false},
        { text: "Rat", correct: true},
      ]
    },
    {
      question: "push",
      options: [
        { text: "Blue Jay", correct: false},
        { text: "Cat", correct: true},
        { text: "Moose", correct: false},
        { text: "Dog", correct: false},
      ]
    },
    {
      question: "ch’ésḵen",
      options: [
        { text: "Ant", correct: false},
        { text: "Donkey", correct: false},
        { text: "Golden Eagle", correct: true},
        { text: "Peregrin Falcon", correct: false},
      ]
    },
    {
      question: "kwu7s",
      options: [
        { text: "Ant", correct: false},
        { text: "Mosquito", correct: false},
        { text: "Black Bear", correct: false},
        { text: "Spring Salmon", correct: true},
      ]
    },
    {
      question: "kw’át’an",
      options: [
        { text: "Lion", correct: false},
        { text: "Cheetah", correct: false},
        { text: "Mouse", correct: true},
        { text: "Porcupine", correct: false},
      ]
    },
  ];

  const questionElement = document.getElementById("question");
  const optionButton = document.getElementById("option-buttons");
  const nextButton = document.getElementById("next-btn");
  let counter = 0;

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }

  function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.options.forEach(option => {
      const button = document.createElement("button");
      button.innerHTML = option.text;
      button.classList.add("btn");
      optionButton.appendChild(button);
      if(option.correct){
        button.dataset.correct = option.correct;
      }
      button.addEventListener("click", selectOption);
    });
  }

  function resetState() {
    nextButton.style.display = "none";
    while(optionButton.firstChild){
      optionButton.removeChild(optionButton.firstChild);
    }
  }

  function selectOption(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }else{
      selectedBtn.classList.add("incorrect");
    }
    Array.from(optionButton.children).forEach(button => {
      if(button.dataset.correct === "true"){
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }

  function showScore(){
    resetState();
    questionElement.innerHTML = 'You got ' + score + ' out of ' + questions.length + ' correct.';
    console.log(score);
    if (counter <= 1) {
    db.collection("Score").add({
      points: score
    })}
    if(score < 5) {
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    }
    else {
      nextButton.style.display = "block";
  }
}

  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
      showQuestion();
    }else{
      showScore();
    }
  }

  nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length) {
      handleNextButton();
    }else if(score == questions.length) {
      showScore();
    }
    else {
      startQuiz();
      counter++;
}

  })

  startQuiz();

/*   async function getScore() {
    console.log(score);
    db.collection("gameScore").add({
      points: score
    })
  }

  getScore();
*/