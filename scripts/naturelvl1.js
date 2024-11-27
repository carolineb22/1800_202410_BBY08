// const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
 // const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
   // return new bootstrap.Tooltip(tooltipTriggerEl);

   const questions = [
    {
      question: "ḵ’eḵsín̓ ti siyátshen ",
      options: [
        { text: "rose", correct: false},
        { text: "polar bear", correct: false},
        { text: "universe", correct: true},
        { text: "twig", correct: false},
      ]
    },
    {
      question: "spáḵ’em",
      options: [
        { text: "world", correct: false},
        { text: "sun", correct: false},
        { text: "earth", correct: false},
        { text: "flower", correct: true},
      ]
    },
    {
      question: "spahím̓",
      options: [
        { text: "sun", correct: false},
        { text: "wind", correct: true},
        { text: "tree", correct: false},
        { text: "flower", correct: false},
      ]
    },
    {
      question: "kwúsen",
      options: [
        { text: "star", correct: true},
        { text: "leaf", correct: false},
        { text: "bear", correct: false},
        { text: "sky", correct: false},
      ]
    },
    {
      question: "skwayl",
      options: [
        { text: "flower", correct: false},
        { text: "rain", correct: false},
        { text: "sky", correct: true},
        { text: "star", correct: false},
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