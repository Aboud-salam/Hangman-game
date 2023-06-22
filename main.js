let lettersContainer = document.querySelector(".container .letters")
let letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArr = Array.from(letters)

lettersArr.forEach(letter => {
    let span = document.createElement("span")
    span.className = "letter-box"
    span.appendChild(document.createTextNode(letter))
    lettersContainer.appendChild(span)
})

// Generate random word

let words = {
    movies: ["Inception", "Prestige", "Interstellar", "Whiplash", "Up", "Coco", "Momento"],
    cars: ["Ford", "Bmw", "Mercedes", "Bugatti", "Volks Vagen", "Nissan", "Toyota", "Fiat"],
    cities: ["Gaza", "Yafa", "New York", "Tokyo", "California", "Cairo", "Port Said", "Paris", "Leeds"],
    characters: ["Al Pacino", "Vandam", "Paul Walker", "Magnus Carlsen", "The Rock", "Batman", "Spiderman"]
}
let myReq = new XMLHttpRequest();
myReq.onreadystatechange = function () {
    if (myReq.readyState === 4 && myReq.status === 200) {
        let data = myReq.responseText
        console.log(data)
    }
}
myReq.open("GET", "https://api.npoint.io/e38637e05a7cf1b506a1")
myReq.send()

let allKeys = Object.keys(words)
let randomNumber = Math.floor(Math.random() * allKeys.length);
let randomProp = allKeys[randomNumber];
let randomValues = words[randomProp]
let randomWordNum = Math.floor(Math.random() * randomValues.length)
let randomWord = randomValues[randomWordNum].toLowerCase();
document.querySelector(".game-info .category span").innerHTML = randomProp


let guessArr = Array.from(randomWord)
guessArr.forEach(letter => {
    let span = document.createElement("span")
    if (letter === " ") {
        span.className = "has-space"
    }
    document.querySelector(".guess-letters").appendChild(span)
})
console.log(guessArr)
let drawArr = Array.from(document.querySelector(".draw").children)
let mistakesCount = 0;
lettersContainer.addEventListener("click", function (e) {
    let letterStatus = false;
    if (e.target.classList.contains("letter-box")) {
        e.target.classList.add("clicked")
        guessArr.forEach((letter,index) => {
            if (letter === e.target.innerHTML) {
                letterStatus = true
                console.log(letter,index)
                document.querySelectorAll(".guess-letters span")[index].appendChild(document.createTextNode(letter))
                document.querySelectorAll(".guess-letters span")[index].classList.add(`found-${index}`)
            }
        })
        if (letterStatus !== true) {
            mistakesCount++
            document.querySelector(".hangman-content").classList.add(`wrong-${mistakesCount}`)
            document.querySelector(".error").play()
        } else {
            document.querySelector(".suc").play()
        }
        if (document.body.contains(document.querySelector(".wrong-7"))) {
            lettersContainer.classList.add("finished")
            setTimeout(endGame, 100)
        }
        if (document.body.contains(document.querySelector(`.found-${randomWord.length-1}`))) {
            setTimeout(wonGame, 100)
        }
    }
})

function endGame() {
    let splash = document.createElement("div")
    splash.className = "splash"
    let textOne = document.createTextNode('Game Over');
    splash.appendChild(textOne)
    let textTwo = document.createElement("p")
    textTwo.classList.add("text-two")
    textTwo.appendChild(document.createTextNode(`The Word is ${randomWord}`))
    splash.appendChild(textTwo)
    document.body.appendChild(splash)
    document.querySelector(".game-over").play()
}
function wonGame() {
    let winPopup = document.createElement("div")
    winPopup.className = "win-popup";
    winPopup.appendChild(document.createTextNode("Congrats ! You've Won"))
    let winTextEl = document.createElement("p")
    winTextEl.className = "win-text"
    let winText = document.createTextNode(`Your Mistakes : ${mistakesCount}`)
    winTextEl.appendChild(winText)
    winPopup.appendChild(winTextEl)
    document.body.appendChild(winPopup)
    document.querySelector(".win").play()
}