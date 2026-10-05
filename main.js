const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
];
const lvls = {
  Easy: 6,
  Normal: 3,
  Hard: 2,
};

let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .secs");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

input.onpaste = function () {
  return false;
};
startButton.onclick = function () {
  this.remove();
  input.focus();
  genWords();
};
keyboardEvent = document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    startButton.click();
  }
});

function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          theWord.innerHTML = "";
          upcomingWords.innerHTML = "";
          finishMessage.innerHTML = `<span class="good">Congratz</span>`;
        }
      } else {
        theWord.innerHTML = "";
        upcomingWords.innerHTML = "";
        finishMessage.innerHTML = `<span class="bad">Game Over</span>`;
        let retryButton = document.createElement("button");
        let retryButtonText = document.createTextNode("Retry");
        retryButton.appendChild(retryButtonText);
        theWord.appendChild(retryButton);
        retryButton.onclick = function () {
          retry();
        };
        keyboardEvent = document.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            retry();
          }
        });
      }
    }
  }, 1000);
}
function retry() {
  window.location.reload();
}
