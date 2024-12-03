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
  let xp = 0;

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