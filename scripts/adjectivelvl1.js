
 // const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
 // const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
   // return new bootstrap.Tooltip(tooltipTriggerEl);

   const questions = [
    {
      question: "eḵwís",
      options: [
        { text: "tall", correct: false},
        { text: "rich", correct: false},
        { text: "fast", correct: false},
        { text: "narrow", correct: true},
      ]
    },
    {
      question: "ch’ey̓xw",
      options: [
        { text: "dry", correct: true},
        { text: "insane", correct: false},
        { text: "cold", correct: false},
        { text: "ecstatic", correct: false},
      ]
    },
    {
      question: "etsím",
      options: [
        { text: "frightening", correct: false},
        { text: "misunderstood", correct: false},
        { text: "small", correct: true},
        { text: "tiny", correct: false},
      ]
    },
    {
      question: "hiyí",
      options: [
        { text: "big", correct: true},
        { text: "sweet", correct: false},
        { text: "sour", correct: false},
        { text: "wide", correct: false},
      ]
    },
    {
      question: "kw'as",
      options: [
        { text: "weak", correct: false},
        { text: "stubborn", correct: false},
        { text: "hot, warm", correct: true},
        { text: "wet", correct: false},
      ]
    },
  ];

  const questionElement = document.getElementById("question");
  const optionButton = document.getElementById("option-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let counter = 0;
  let xp = 0;
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
    }else if(score == 5) {
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
