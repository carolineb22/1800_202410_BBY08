const questions = [
  {
    question: "hew̓ít",
    options: [
      { text: "Dog", correct: false },
      { text: "Bear", correct: false },
      { text: "Raven", correct: false },
      { text: "Rat", correct: true },
    ]
  },
  {
    question: "push",
    options: [
      { text: "Blue Jay", correct: false },
      { text: "Cat", correct: true },
      { text: "Moose", correct: false },
      { text: "Dog", correct: false },
    ]
  },
  {
    question: "ch’ésḵen",
    options: [
      { text: "Ant", correct: false },
      { text: "Donkey", correct: false },
      { text: "Golden Eagle", correct: true },
      { text: "Peregrin Falcon", correct: false },
    ]
  },
  {
    question: "kwu7s",
    options: [
      { text: "Ant", correct: false },
      { text: "Mosquito", correct: false },
      { text: "Black Bear", correct: false },
      { text: "Spring Salmon", correct: true },
    ]
  },
  {
    question: "kw’át’an",
    options: [
      { text: "Lion", correct: false },
      { text: "Cheetah", correct: false },
      { text: "Mouse", correct: true },
      { text: "Porcupine", correct: false },
    ]
  },
];

const questionElement = document.getElementById("question");
const optionButton = document.getElementById("option-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let xp = 0; 
let counter = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  xp = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerHTML = option.text;
    button.classList.add("btn");
    optionButton.appendChild(button);
    if (option.correct) {
      button.dataset.correct = option.correct;
    }
    button.addEventListener("click", selectOption);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (optionButton.firstChild) {
    optionButton.removeChild(optionButton.firstChild);
  }
}

function selectOption(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(optionButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  xp = score * 10; // Example: 10 XP per correct answer
  questionElement.innerHTML = `
    You got ${score} out of ${questions.length} correct.<br>
    You've earned ${xp} XP!
  `;

  // Save the score and XP to the database
  if (counter <= 1) {
    db.collection("Score").add({
      points: score,
      experience: xp // Save XP to the database
    });
  }

  // Update button text based on performance
  if (score < questions.length) {
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  } else {
    nextButton.innerHTML = "Congratulations!";
    nextButton.style.display = "block";
  }
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
    counter++;
  }
});

startQuiz();
