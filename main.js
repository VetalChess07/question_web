const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

let score = 0;
let questionIndex = 0;

let headerContainer = document.querySelector("#header");
let listrContainer = document.querySelector("#list");
let submitBtn = document.querySelector("#submit");

clearHtml();
showQuetion();
submitBtn.onclick = checkAnswer;

function clearHtml() {
  headerContainer.innerHTML = "";
  listrContainer.innerHTML = "";
}

function showQuetion() {
  const headerTeamplate = `<h2 class="title">%title%</h2>`;
  const title = headerTeamplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );

  headerContainer.innerHTML = title;
  let answerNumber = 1;
  for (item of questions[questionIndex]["answers"]) {
    const questionTemplate = `
	 <li>
		<label>
			<input value="%number%" type="radio" class="answer" name="answer" />
			<span>%answers%</span>
		</label>
	 </li>`;

    let answerHtml = questionTemplate.replace("%answers%", item);

    answerHtml = answerHtml.replace("%number%", answerNumber);

    listrContainer.innerHTML = listrContainer.innerHTML + answerHtml;
    answerNumber++;
  }
}
function checkAnswer() {
  const checkRadio = listrContainer.querySelector(
    'input[type="radio"]:checked'
  );

  // выход из функции если ничего не выбрано
  if (!checkRadio) {
    alert("Выберите ответ");
    return;
  }

  const userAnswer = parseInt(checkRadio.value);

  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    console.log("это не последнйи вопрос");
    questionIndex++;
    clearHtml();
    showQuetion();
  } else {
    console.log("это последнйи вопрос");
    clearHtml();
    showRes();
  }
}

function showRes() {
  const resTeamplate = `
  <h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
	`;
  let title, message;

  if (score === questions.length) {
    title = "поздравляем!";
    message = "Все верно 💯!";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Не плохой результат! 👍";
    message = "Вы верно ответили на половину вопросов 🧠";
  } else {
    title = "Плохой результат! 👎";
    message =
      "У вас меньше половины правильных ответов, <br> но старайтесь и все получится 🚀";
  }

  let res = `${score} из ${questions.length} `;

  const finalMesage = resTeamplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", res);

  headerContainer.innerHTML = finalMesage;

  submitBtn.innerText = "начать заново";
  submitBtn.onclick = () => history.go();
}
