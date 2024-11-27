// const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
 // const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
   // return new bootstrap.Tooltip(tooltipTriggerEl);

   const questions = [
    {
      question: "chen",
      options: [
        { text: "You", correct: false},
        { text: "Me", correct: false},
        { text: "I", correct: true},
        { text: "They", correct: false},
      ]
    },
    {
      question: "chexw",
      options: [
        { text: "You", correct: true},
        { text: "We", correct: false},
        { text: "Ours", correct: false},
        { text: "Myself", correct: false},
      ]
    },
    {
      question: "ents",
      options: [
        { text: "He", correct: false},
        { text: "She", correct: false},
        { text: "I/me", correct: true},
        { text: "Us", correct: false},
      ]
    },
    {
      question: "chet",
      options: [
        { text: "You (plural)", correct: false},
        { text: "We", correct: true},
        { text: "They", correct: false},
        { text: "Themselves", correct: false},
      ]
    },
    {
      question: "hawḵ",
      options: [
        { text: "All", correct: false},
        { text: "Nothing", correct: false},
        { text: "None", correct: true},
        { text: "We", correct: false},
      ]
    },
    {
       question: "i7x̱w swat",
       options: [
         { text: "You", correct: false},
         { text: "None", correct: false},
         { text: "Everyone", correct: true},
         { text: "Everywhere", correct: false},
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