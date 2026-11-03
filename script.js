const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const questions = [
  {
    question: 'Apa fungsi utama otak dalam sistem saraf?',
    answers: ['Menghubungkan tulang', 'Mengolah informasi dan mengoordinasikan tubuh', 'Menghasilkan gerakan dengan kontraksi', 'Melindungi seluruh organ tubuh'],
    correct: 1,
    explanation: 'Otak merupakan pusat pengolahan informasi dan koordinasi tubuh.'
  },
  {
    question: 'Bagian sistem saraf yang menjadi jalur penghantar impuls dan pusat refleks tertentu adalah ...',
    answers: ['Otot', 'Sendi', 'Sumsum tulang belakang', 'Tulang'],
    correct: 2,
    explanation: 'Sumsum tulang belakang menghantarkan impuls saraf dan menjadi pusat refleks tertentu.'
  },
  {
    question: 'Apa fungsi sendi dalam sistem gerak?',
    answers: ['Menghubungkan tulang dan memungkinkan gerakan', 'Mengolah informasi dari lingkungan', 'Menghasilkan impuls saraf', 'Melindungi otak'],
    correct: 0,
    explanation: 'Sendi menghubungkan tulang dan memungkinkan terjadinya gerakan tertentu.'
  },
  {
    question: 'Bagaimana otot menghasilkan gerakan?',
    answers: ['Dengan menerima rangsangan saja', 'Dengan menghubungkan sistem saraf pusat', 'Dengan melindungi organ', 'Dengan berkontraksi dan relaksasi'],
    correct: 3,
    explanation: 'Otot menghasilkan gerakan melalui proses kontraksi dan relaksasi.'
  },
  {
    question: 'Menarik tangan ketika menyentuh benda panas termasuk contoh ...',
    answers: ['Gerak sadar', 'Gerak refleks', 'Gerak sendi', 'Gerak tulang'],
    correct: 1,
    explanation: 'Menarik tangan dari benda panas merupakan contoh gerak refleks.'
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;

const questionCounter = document.getElementById('questionCounter');
const progressBar = document.getElementById('progressBar');
const questionText = document.getElementById('questionText');
const answerList = document.getElementById('answerList');
const feedback = document.getElementById('feedback');
const nextButton = document.getElementById('nextButton');
const quizBox = document.getElementById('quizBox');
const quizResult = document.getElementById('quizResult');

function renderQuestion() {
  const item = questions[currentQuestion];
  selectedAnswer = null;
  answered = false;
  questionCounter.textContent = `PERTANYAAN ${String(currentQuestion + 1).padStart(2, '0')} / ${questions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  questionText.textContent = item.question;
  feedback.textContent = 'Pilih satu jawaban yang menurutmu benar.';
  nextButton.disabled = true;
  nextButton.innerHTML = currentQuestion === questions.length - 1 ? 'Lihat hasil <span>→</span>' : 'Selanjutnya <span>→</span>';
  answerList.innerHTML = '';

  item.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.type = 'button';
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
    button.addEventListener('click', () => selectAnswer(index));
    answerList.appendChild(button);
  });
}

function selectAnswer(index) {
  if (answered) return;
  selectedAnswer = index;
  answered = true;
  const item = questions[currentQuestion];
  const options = [...answerList.children];

  options.forEach((option, optionIndex) => {
    option.disabled = true;
    if (optionIndex === item.correct) option.classList.add('correct');
    if (optionIndex === index && index !== item.correct) option.classList.add('wrong');
    if (optionIndex === index) option.classList.add('selected');
  });

  if (index === item.correct) {
    score++;
    feedback.textContent = `Benar! ${item.explanation}`;
  } else {
    feedback.textContent = `Belum tepat. ${item.explanation}`;
  }
  nextButton.disabled = false;
}

nextButton.addEventListener('click', () => {
  if (!answered) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.hidden = true;
  quizResult.hidden = false;
  document.getElementById('resultTitle').textContent = score >= 4 ? 'Kerja bagus!' : 'Tetap semangat!';
  document.getElementById('resultText').textContent = `Kamu menjawab ${score} dari ${questions.length} pertanyaan dengan benar. ${score === 5 ? 'Semua jawaban benar. Mantap!' : 'Coba pelajari lagi bagian yang belum kamu kuasai, lalu ulangi kuisnya.'}`;
}

document.getElementById('restartButton').addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  quizResult.hidden = true;
  quizBox.hidden = false;
  renderQuestion();
});

renderQuestion();

// Menandai menu sesuai bagian yang sedang terlihat.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));
