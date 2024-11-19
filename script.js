const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let correctAnswersCount = 0;
let wrongAnswersCount = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hidden');
  correctAnswersCount = 0;
  wrongAnswersCount = 0;
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hidden');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add('hidden');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';

  if (correct) {
    correctAnswersCount++;
    wrongAnswersCount = 0; // Reseta os erros consecutivos
    selectedButton.classList.add('correct');
  } else {
    wrongAnswersCount++;
    correctAnswersCount = 0; // Reseta os acertos consecutivos
    selectedButton.classList.add('wrong');
  }

  // Atualiza o status de todos os botões
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
  });

  // Verificar condição de vitória ou derrota
  if (correctAnswersCount === 5) {
    showEndMessage('Você venceu! 🎉');
    return;
  }
  if (wrongAnswersCount === 5) {
    showEndMessage('Você perdeu! 😢');
    return;
  }

  // Avançar para a próxima pergunta ou finalizar o jogo
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hidden');
  } else {
    showEndMessage('Fim do jogo! Obrigado por jogar.');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function showEndMessage(message) {
  resetState();
  questionElement.innerText = message;
  startButton.innerText = 'Jogar novamente';
  startButton.classList.remove('hidden');
  questionContainerElement.classList.add('hidden');
  correctAnswersCount = 0;
  wrongAnswersCount = 0;
}


const questions = [
  {
    question: 'Qual é a capital da França?',
    answers: [
      { text: 'Paris', correct: true },
      { text: 'Londres', correct: false },
      { text: 'Berlim', correct: false },
      { text: 'Madri', correct: false }
    ]
  },
  {
    question: 'Qual é o maior planeta do sistema solar?',
    answers: [
      { text: 'Júpiter', correct: true },
      { text: 'Saturno', correct: false },
      { text: 'Marte', correct: false },
      { text: 'Terra', correct: false }
    ]
  },
  {
    question: 'Quem escreveu "Dom Quixote"?',
    answers: [
      { text: 'Miguel de Cervantes', correct: true },
      { text: 'William Shakespeare', correct: false },
      { text: 'Machado de Assis', correct: false },
      { text: 'Fernando Pessoa', correct: false }
    ]
  },




  {
    question: 'Primogênito é o nome dado a qual filho de um casal?',
    answers: [
      { text: 'Segundo filho', correct: false },
      { text: 'Último filho', correct: false },
      { text: 'Filho do meio', correct: false },
      { text: 'Primeiro filho', correct: true }
    ]
  },
  {
    question: 'Qual cidade brasileira é conhecida como a Terra da Garoa?',
    answers: [
      { text: 'Curitiba', correct: false },
      { text: 'São Paulo', correct: true },
      { text: 'Recife', correct: false },
      { text: 'Rio de Janeiro', correct: false }
    ]
  },
  {
    question: 'Quantas vogais há na palavra "pesqueiro"? ',
    answers: [
      { text: 'Duas ', correct: false },
      { text: ' Quatro', correct: false },
      { text: 'Cinco ', correct: true },
      { text: 'Seis ', correct: false }
    ]
  },
  {
    question: 'Qual é o nome do único satélite natural da Terra? ',
    answers: [
      { text: 'Tupã ', correct: false },
      { text: 'Lua ', correct: true },
      { text: 'Titã ', correct: false },
      { text: 'Io ', correct: false }
    ]
  },
  {
    question: 'Qual é a cor do sangue arterial? ',
    answers: [
      { text: 'Vermelho', correct: true },
      { text: 'Azul ', correct: false },
      { text: ' Roxo', correct: false },
      { text: ' Preto', correct: false }
    ]
  },
  {
    question: 'Quem foi o primeiro presidente do Brasil?',
    answers: [
      { text: 'Getúlio Vargas', correct: false },
      { text: 'Deodoro da Fonseca', correct: true },
      { text: 'Dom Pedro II', correct: false },
      { text: 'Floriano Peixoto', correct: false }
    ]
  },
  {
    question: 'Qual é o metal cujo símbolo químico é Au?',
    answers: [
      { text: 'Prata', correct: false },
      { text: 'Ouro', correct: true },
      { text: 'Cobre', correct: false },
      { text: 'Alumínio', correct: false }
    ]
  },
  {
    question: 'Em que ano o homem pisou na Lua pela primeira vez?',
    answers: [
      { text: '1969', correct: true },
      { text: '1972', correct: false },
      { text: '1958', correct: false },
      { text: '1965', correct: false }
    ]
  },
  {
    question: 'Qual país é conhecido como a terra do sol nascente?',
    answers: [
      { text: 'China', correct: false },
      { text: 'Japão', correct: true },
      { text: 'Coreia do Sul', correct: false },
      { text: 'Tailândia', correct: false }
    ]
  },
  {
    question: 'Quantos segundos há em uma hora?',
    answers: [
      { text: '3600', correct: true },
      { text: '6000', correct: false },
      { text: '2400', correct: false },
      { text: '7200', correct: false }
    ]
  },
  {
    question: 'Quem pintou "A Última Ceia"?',
    answers: [
      { text: 'Leonardo da Vinci', correct: true },
      { text: 'Michelangelo', correct: false },
      { text: 'Raphael', correct: false },
      { text: 'Donatello', correct: false }
    ]
  },
  {
    question: 'Qual é o maior oceano do mundo?',
    answers: [
      { text: 'Atlântico', correct: false },
      { text: 'Índico', correct: false },
      { text: 'Pacífico', correct: true },
      { text: 'Ártico', correct: false }
    ]
  },
  {
    question: 'Qual é a fórmula química da água?',
    answers: [
      { text: 'CO2', correct: false },
      { text: 'H2O', correct: true },
      { text: 'O2', correct: false },
      { text: 'NaCl', correct: false }
    ]
  },
  {
    question: 'Qual é a unidade básica da vida?',
    answers: [
      { text: 'Tecido', correct: false },
      { text: 'Célula', correct: true },
      { text: 'Átomo', correct: false },
      { text: 'Molécula', correct: false }
    ]
  },
  {
    question: 'Qual é a fórmula química do gás ozônio?',
    answers: [
      { text: 'O3', correct: true },
      { text: 'O2', correct: false },
      { text: 'CO2', correct: false },
      { text: 'H2O', correct: false }
    ]
  },
  {
    question: 'Quem é conhecido como o "Pai da Computação"?',
    answers: [
      { text: 'Alan Turing', correct: true },
      { text: 'Steve Jobs', correct: false },
      { text: 'Bill Gates', correct: false },
      { text: 'Charles Babbage', correct: false }
    ]
  },
  {
    question: 'Qual país tem o formato de uma bota?',
    answers: [
      { text: 'Itália', correct: true },
      { text: 'Grécia', correct: false },
      { text: 'Espanha', correct: false },
      { text: 'Turquia', correct: false }
    ]
  },
  {
    question: 'Qual é o maior animal terrestre?',
    answers: [
      { text: 'Elefante Africano', correct: true },
      { text: 'Girafa', correct: false },
      { text: 'Hipopótamo', correct: false },
      { text: 'Rinoceronte', correct: false }
    ]
  },
  {
    question: 'Qual gás é essencial para a respiração humana?',
    answers: [
      { text: 'Hidrogênio', correct: false },
      { text: 'Oxigênio', correct: true },
      { text: 'Nitrogênio', correct: false },
      { text: 'Gás Carbônico', correct: false }
    ]
  },
  {
    question: 'Quem escreveu "A Origem das Espécies"?',
    answers: [
      { text: 'Charles Darwin', correct: true },
      { text: 'Gregor Mendel', correct: false },
      { text: 'Albert Einstein', correct: false },
      { text: 'Isaac Newton', correct: false }
    ]
  },
  {
    question: 'Qual é a moeda oficial do Japão?',
    answers: [
      { text: 'Yen', correct: true },
      { text: 'Won', correct: false },
      { text: 'Dólar', correct: false },
      { text: 'Euro', correct: false }
    ]
  },
  {
    question: 'Qual é o menor país do mundo?',
    answers: [
      { text: 'Mônaco', correct: false },
      { text: 'Vaticano', correct: true },
      { text: 'Malta', correct: false },
      { text: 'San Marino', correct: false }
    ]
  },
  {
    question: 'Quem pintou "A Noite Estrelada"?',
    answers: [
      { text: 'Vincent van Gogh', correct: true },
      { text: 'Pablo Picasso', correct: false },
      { text: 'Claude Monet', correct: false },
      { text: 'Salvador Dalí', correct: false }
    ]
  },
  {
    question: 'Qual é o elemento químico mais abundante no universo?',
    answers: [
      { text: 'Oxigênio', correct: false },
      { text: 'Hidrogênio', correct: true },
      { text: 'Carbono', correct: false },
      { text: 'Hélio', correct: false }
    ]
  },
  {
    question: 'Quantos lados tem um hexágono?',
    answers: [
      { text: 'Cinco', correct: false },
      { text: 'Seis', correct: true },
      { text: 'Sete', correct: false },
      { text: 'Oito', correct: false }
    ]
  },
  {
    question: 'Qual é o nome da galáxia onde vivemos?',
    answers: [
      { text: 'Via Láctea', correct: true },
      { text: 'Andrômeda', correct: false },
      { text: 'Triângulo', correct: false },
      { text: 'Sombrero', correct: false }
    ]
  },
  {
    question: 'Qual é a capital da Austrália?',
    answers: [
      { text: 'Sydney', correct: false },
      { text: 'Canberra', correct: true },
      { text: 'Melbourne', correct: false },
      { text: 'Brisbane', correct: false }
    ]
  },
  {
    question: 'Qual é o planeta mais próximo do Sol?',
    answers: [
      { text: 'Mercúrio', correct: true },
      { text: 'Vênus', correct: false },
      { text: 'Terra', correct: false },
      { text: 'Marte', correct: false }
    ]
  },
  {
    question: 'Quantos continentes existem no mundo?',
    answers: [
      { text: 'Cinco', correct: false },
      { text: 'Seis', correct: false },
      { text: 'Sete', correct: true },
      { text: 'Oito', correct: false }
    ]
  },
  {
    question: 'Qual é o nome do maior deserto do mundo?',
    answers: [
      { text: 'Saara', correct: true },
      { text: 'Kalahari', correct: false },
      { text: 'Gobi', correct: false },
      { text: 'Atacama', correct: false }
    ]
  },
  {
    question: 'Qual a velocidade da luz no vácuo, aproximadamente?',
    answers: [
      { text: '300.000 km/s', correct: true },
      { text: '150.000 km/s', correct: false },
      { text: '1.000.000 km/s', correct: false },
      { text: '30.000 km/s', correct: false }
    ]
  },
  {
    question: 'Quem descobriu o Brasil?',
    answers: [
      { text: 'Pedro Álvares Cabral', correct: true },
      { text: 'Cristóvão Colombo', correct: false },
      { text: 'Vasco da Gama', correct: false },
      { text: 'Fernão de Magalhães', correct: false }
    ]
  },
  {
    question: 'Qual é a maior montanha do mundo?',
    answers: [
      { text: 'K2', correct: false },
      { text: 'Monte Everest', correct: true },
      { text: 'Kilimanjaro', correct: false },
      { text: 'Aconcágua', correct: false }
    ]
  }
];

