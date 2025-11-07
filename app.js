document.addEventListener('DOMContentLoaded', () => {
    let questions = [
        {
            question: "Welcher ist die Hauptstadt von Frankreich?",
            options: ["Berlin", "Madrid", "Paris", "Rom"],
            answer: 2
        },
        {
            question: "Was ist die Hauptstadt von Deutschland?",
            options: ["Berlin", "München", "Frankfurt", "Hamburg"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Italien?",
            options: ["Rom", "Mailand", "Neapel", "Turin"],
             answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Kanada?",
            options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
            answer: 2
        },
        {
            question: "was ist Hauptstadt von Tschechien?",
            options: ["Prag", "Brünn", "Ostrava", "Plzeň"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Österreich?",
            options: ["Wien", "Salzburg", "Innsbruck", "Graz"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Ungarn?",
            options: ["Budapest", "Debrecen", "Szeged", "Miskolc"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Serbien?",
            options: ["Belgrad", "Novi Sad", "Niš", "Kragujevac"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Argentinien?",
            options: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
            answer: 0
        },
        {
            question: "Was ist Hauptstadt von Mexiko?",
            options: ["Mexiko-Stadt", "Guadalajara", "Monterrey", "Puebla"],
            answer: 0
        },
        {
            question: "was ist die Hauptstadt von Somalia?",
            options: ["Mogadischu", "Hargeisa", "Bosaso", "Kismayo"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von den USA?",
            options: ["Washington, D.C.", "New York City", "Los Angeles", "Chicago"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Ägypten?",
            options: ["Kairo", "Alexandria", "Gizeh", "Luxor"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Japan?",
            options: ["Tokio", "Kyoto", "Osaka", "Hiroshima"],
            answer: 0
        },
        {
            question: "was ist die Hauptstadt von Russland?",
            options: ["Moskau", "Sankt Petersburg", "Kasan", "Nowosibirsk"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Weißrussland?",
            options: ["Minsk", "Brest", "Gomel", "Mogilev"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Malaysia?",
            options: ["Kuala Lumpur", "George Town", "Malakka", "Johor Bahru"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Indien?",
            options: ["Neu-Delhi", "Mumbai", "Bangalore", "Kolkata"],
            answer: 0
        },
        {
            question: "Was ist die Hauptstadt von Marokko?",
            options: ["Rabat", "Casablanca", "Marrakesch", "Fes"],
            answer: 0
        },
        {
            question: "was ist die Hauptstadt von Polen?",
            options: ["Warschau", "Krakau", "Łódź", "Wrocław"],
            answer: 0
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswers = [];

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.querySelector('.options');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const scorePercentage = document.getElementById('score-percentage');
    const retryButton = document.getElementById('retry-button');
    const congratsAudio = document.getElementById('congrats-audio');

    const landingPage = document.getElementById('landing-page');
    const examContainer = document.getElementById('exam-container');
    const startExamButton = document.getElementById('start-exam-button');
    const exampleButton = document.getElementById('example-button');
    const exampleModal = document.getElementById('example-modal');
    const closeModal = document.getElementById('close-modal');
    const timeElement = document.getElementById('time');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');

    totalQuestionsElement.textContent = questions.length;

    // Function to shuffle questions array
    function shuffleQuestions() {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }

    // Function to Load Questions
    function loadQuestion(index) {
        const question = questions[index];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(i));
            if (selectedAnswers[currentQuestionIndex] === i) {
                optionElement.classList.add('selected');
            }
            optionsContainer.appendChild(optionElement);
        });

        currentQuestionElement.textContent = index + 1;
        updateNavigationButtons();
    }

    function selectOption(selectedIndex) {
        selectedAnswers[currentQuestionIndex] = selectedIndex;
        const options = document.querySelectorAll('.option');
        options.forEach(option => option.classList.remove('selected'));
        options[selectedIndex].classList.add('selected');
    }

    function updateNavigationButtons() {
        prevButton.disabled = currentQuestionIndex === 0;
        nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next';
    }

    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) {
            alert('Bitte wählen Sie eine Option aus!');
            return;
        }

        // Check the answer for the current question
        if (selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].answer) {
            score++;
        }

        if (currentQuestionIndex === questions.length - 1) {
            finishExam();
        } else {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }
    });

    function finishExam() {
        const totalScore = Math.round((score / questions.length) * 100);

        if (totalScore >= 50) {
            resultText.textContent = 'Herzlichen Glückwunsch! Sie haben den Test bestanden.';
            resultText.style.color = 'green';
            // playCongratsSound();
            // triggerCelebration();
        } else {
            resultText.textContent = 'Leider haben Sie den Test nicht bestanden. Viel Glück beim nächsten Mal!';
            resultText.style.color = 'red';
        }

        scorePercentage.textContent = `Score: ${totalScore}%`;
        showResults();
    }

    function playCongratsSound() {
        congratsAudio.play();
    }

    function triggerCelebration() {
        const celebrationContainer = document.createElement('div');
        celebrationContainer.classList.add('celebration-container');
        document.body.appendChild(celebrationContainer);

        // Create confetti elements
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            celebrationContainer.appendChild(confetti);
        }

        // Remove confetti after 2 seconds
        setTimeout(() => {
            celebrationContainer.remove();
        }, 2000);
    }

    function showResults() {
        resultContainer.style.display = 'block';
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        optionsContainer.style.display = 'none';
        questionText.style.display = 'none';
    }

    retryButton.addEventListener('click', () => {
        window.location.reload(); // Reload the page to reset the exam
    });

    function startTimer(duration) {
        let timer = duration, minutes, seconds;
        setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            timeElement.textContent = `${minutes}:${seconds}`;

            if (--timer < 0) {
                finishExam();
            }
        }, 1000);
    }

    // Landing Page Event Listeners
    startExamButton.addEventListener('click', () => {
        shuffleQuestions(); // Shuffle questions before starting the exam
        landingPage.style.display = 'none';
        examContainer.style.display = 'block';
        loadQuestion(currentQuestionIndex);
        startTimer(300); // 5 minutes timer
    });

    exampleButton.addEventListener('click', () => {
        exampleModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        exampleModal.style.display = 'none';
    });

    // Click outside the modal to close it
    window.addEventListener('click', (event) => {
        if (event.target === exampleModal) {
            exampleModal.style.display = 'none';
        }
    });
});
