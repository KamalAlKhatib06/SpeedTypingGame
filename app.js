

//Array From Words 
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
    "Rust",
    "Playing"
];

// Setting Levels 
const lvls = {
    "Easy": 6,
    "Normal": 4,
    "Hard": 3
}

// Default 
let select = document.querySelector("select")



let defaultLevelName = select.options[select.selectedIndex].textContent
let defaultLevelSeconds = lvls[defaultLevelName]
let start = null

function updateValue() {
    let defaultLevelName = select.options[select.selectedIndex].textContent
    lvlNameSpan.innerHTML = defaultLevelName
    if (lvlNameSpan.innerHTML == "Hard" || lvlNameSpan.innerHTML == "Normal" || lvlNameSpan.innerHTML == "Easy") {
        secondsSpan.innerHTML = lvls[defaultLevelName]
        timeLeftSpan.innerHTML = lvls[defaultLevelName]

    }
}

// catch Selectors

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let lvlChoose = document.querySelector(".lvl-choose")
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Setting LevelName + Seconds + Score

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds
scoreTotal.innerHTML = words.length;

// Disabled Paste Event

input.onpaste = function () {
    return false
}

// Start Game
startButton.onclick = function () {
    this.remove();
    input.focus()
    // Generate Word Function
    genWords()


}

function genWords() {
    let randomWord = words[Math.floor(Math.random() * words.length)]
    // Get Word Index
    let wordIndex = words.indexOf(randomWord)
    // Remove word From Array
    words.splice(wordIndex, 1)

    // Show Random Word
    theWord.innerHTML = randomWord;

    upcomingWords.innerHTML = ""
    // Generate upcoming words

    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div")
        let text = document.createTextNode(words[i])
        div.appendChild(text)
        upcomingWords.appendChild(div)
    }

    // Call Start Play Function
    startPlay()
}

function startPlay() {
    timeLeftSpan.innerHTML = lvls[select.options[select.selectedIndex].innerHTML]
    select.remove()
    lvlChoose.textContent = `you choose ${select.options[select.selectedIndex].innerHTML}`
    start = setInterval(() => {
        timeLeftSpan.innerHTML--
        if (timeLeftSpan.innerHTML === "0") {
            clearInterval(start)
            // Compare Words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // Empty Input Field
                input.value = ""
                scoreGot.innerHTML++

                if (words.length > 0) {
                    genWords()
                }
                else {
                    let span = document.createElement("span")
                    span.className = "good"
                    let spanText = document.createTextNode("Congratulations")
                    span.appendChild(spanText)
                    finishMessage.appendChild(span)
                    upcomingWords.remove()
                    let gameOverBtn = document.createElement("button")
                    let btnText = document.createTextNode("Play Again")
                    gameOverBtn.appendChild(btnText)
                    gameOverBtn.className = "end-btn"
                    finishMessage.appendChild(gameOverBtn)

                    gameOverBtn.onclick = function () {
                        location.reload()
                    }
                }
            }
            else {
                let timeRemain = 5
                let gameOverInterval = setInterval(() => {
                    timeRemain--
                }, 1000);
                console.log(gameOverInterval);
                let span = document.createElement("span")
                span.className = "bad"
                let spanText = document.createTextNode(`Game Over`)
                span.appendChild(spanText)
                finishMessage.appendChild(span)
                let gameOverBtn = document.createElement("button")
                let btnText = document.createTextNode("Play Again")
                gameOverBtn.appendChild(btnText)
                gameOverBtn.className = "end-btn"
                finishMessage.appendChild(gameOverBtn)

                gameOverBtn.onclick = function () {
                    location.reload()
                }
            }
        }
    }, 1000);
}