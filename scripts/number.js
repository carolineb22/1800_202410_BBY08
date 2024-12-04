const questions = [
  {
    question: "nch’u7",
    options: [
      { text: "5", correct: false },
      { text: "2", correct: false },
      { text: "10", correct: false },
      { text: "1", correct: true },
    ]
  },
  {
    question: "lhéxwlhsha7",
    options: [
      { text: "20", correct: false },
      { text: "30", correct: true },
      { text: "40", correct: false },
      { text: "50", correct: false },
    ]
  },
  {
    question: "nách’aw̓ich",
    options: [
      { text: "10", correct: false },
      { text: "90", correct: false },
      { text: "100", correct: true },
      { text: "40", correct: false },
    ]
  },
  {
    question: "60",
    options: [
      { text: "ts’ekwchalhshá7", correct: false },
      { text: "lheḵ’chalhshá7", correct: false },
      { text: "	x̱wutsnalhshá7", correct: false },
      { text: "t’éx̱malhsha7", correct: true },
    ]
  },
  {
    question: "20",
    options: [
      { text: "tsíyáchis", correct: false },
      { text: "ts’es", correct: false },
      { text: "wetl’ch’", correct: true },
      { text: "lheḵ’chalhshá7", correct: false },
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
  xp = score * 10;
  questionElement.innerHTML = `
    You got ${score} out of ${questions.length} correct.<br>
    You've earned ${xp} XP!
  `;


  const user = firebase.auth().currentUser;
  if (user) {
      const userId = user.uid; 

     
      const userDocRef = db.collection("users").doc(userId);

    
      userDocRef.get().then((doc) => {
          if (!doc.exists) {
              
              userDocRef.set({
                  score: score,
                  xp: xp
              }).then(() => {
                  console.log("User document created with initial score and XP.");
              }).catch((error) => {
                  console.error("Error creating user document: ", error);
              });
          } else {
              
              userDocRef.update({
                  score: firebase.firestore.FieldValue.increment(score), 
                  xp: firebase.firestore.FieldValue.increment(xp) 
              }).then(() => {
                  console.log("Score and XP successfully added to the user's total score and XP.");
              }).catch((error) => {
                  console.error("Error adding score and XP to the user's total: ", error);
              });
          }
      }).catch((error) => {
          console.error("Error fetching user document: ", error);
      });

      if (counter <= 1) {
          db.collection("Score").add({
              points: score,
              experience: xp,
              timestamp: firebase.firestore.FieldValue.serverTimestamp() 
          }).then(() => {
              console.log("Quiz score and XP saved successfully.");
          }).catch((error) => {
              console.error("Error saving quiz score and XP: ", error);
          });
      }

      if (score < questions.length) {
          nextButton.innerHTML = "Play Again";
          nextButton.style.display = "block";
      } else {
          nextButton.innerHTML = "Congratulations!";
          nextButton.style.display = "block";
      }
  } else {
      console.error("User not authenticated.");
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
