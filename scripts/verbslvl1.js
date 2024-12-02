// const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
 // const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
   // return new bootstrap.Tooltip(tooltipTriggerEl);

   const questions = [
    {
      question: "ha7lhs",
      options: [
        { text: "cry", correct: false},
        { text: "lift", correct: false},
        { text: "like", correct: true},
        { text: "jump", correct: false},
      ]
    },
    {
      question: "stl’i7",
      options: [
        { text: "dislike", correct: false},
        { text: "disappoint", correct: false},
        { text: "write", correct: false},
        { text: "want", correct: true},
      ]
    },
    {
      question: "Ílhen",
      options: [
        { text: "drink", correct: false},
        { text: "eat", correct: true},
        { text: "breathe", correct: false},
        { text: "sigh", correct: false},
      ]
    },
    {
      question: "p’i7t",
      options: [
        { text: "grab", correct: true},
        { text: "fight/wrestle", correct: false},
        { text: "swim", correct: false},
        { text: "run", correct: false},
      ]
    },
    {
      question: "kway",
      options: [
        { text: "sell", correct: false},
        { text: "wrestle", correct: false},
        { text: "hide", correct: true},
        { text: "speak", correct: false},
      ]
    },
    {
       question: "huyá7",
       options: [
         { text: "agree", correct: false},
         { text: "challenge", correct: false},
         { text: "leave", correct: true},
         { text: "create", correct: false},
       ]  
    },
    {
      question: "ch’em̓",
      options: [
        { text: "strike", correct: false},
        { text: "punch", correct: false},
        { text: "bite", correct: true},
        { text: "scream", correct: false},
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