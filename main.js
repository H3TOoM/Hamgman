const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter)

    span.appendChild(theLetter)
    span.className = "letter-box";

    lettersContainer.appendChild(span)
});


const words = {
    programming: ["python", "java", "java script", "php", "c", "mysql", "go"],
    players: ["messi", "ronaldo", "mo salah", "navas", "ramos", "zidan"],
    names: ["ali", "hatim", "ahmed", "eman", "gehad", "hossam", "mohamed", "nour", "aseel", "khaled"],
    countries: ["egypt", "ksa", "syria", "qatar", "yemen"],
}
let allKeys = Object.keys(words);

let randomNum = Math.floor(Math.random() * allKeys.length);
let randomName = allKeys[randomNum];
let randomValue = words[randomName];
let randomValueNum = Math.floor(Math.random() * randomValue.length);
let randomValueValue = randomValue[randomValueNum];

document.querySelector(".game-info .category span").innerHTML = randomName;

let lettersGuessContainer = document.querySelector(".letters-guess");


let lettersAndspace = Array.from(randomValueValue);
lettersAndspace.forEach(letter => {
    let emptySpan = document.createElement("span")
    if (letter === " ") {
        emptySpan.className = "w-space"
    }

    lettersGuessContainer.appendChild(emptySpan)
})


// guess spans

let guessSpans = document.querySelectorAll(".letters-guess span");

////////////////////

//set wrong

let wrongAttemps = 0;

let theDraw = document.querySelector(".hangman-draw");


document.addEventListener("click", (e) => {

    let theStutes = false;

    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");


        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueValue.toLowerCase())


        theChosenWord.forEach((wordLetter, wordIndex) => {
            if (theClickedLetter === wordLetter) {

                theStutes = true;

                guessSpans.forEach((span, spanIndex) => {

                    if (wordIndex == spanIndex) {

                        span.innerHTML = theClickedLetter

                    }
                })
            }
        });


        if (theStutes !== true) {

            wrongAttemps++;
            theDraw.classList.add(`wrong-${wrongAttemps}`);

            document.getElementById("fail").play();



            if (wrongAttemps === 8) {

                lettersContainer.classList.add("finished");
                (function endGame() {
                    let div = document.createElement("div")

                    div.className = "pop";

                    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`)

                    div.appendChild(divText);
                    let againBtn = document.createElement("button");
                    againBtn.innerHTML = "again";
                    againBtn.className = "again";
                    div.appendChild(againBtn);
                    againBtn.onclick = function () {
                        location.reload()
                    }

                    document.body.appendChild(div)

                })();
                lettersContainer.classList.add("finished");

            }
        } else {

            document.getElementById("success").play();

            
            if (theStutes === true) {
                document.getElementById("success").play();

                let isWordComplete = true;
                guessSpans.forEach(span => {
                    if (span.innerHTML === "") {
                        isWordComplete = false;
                    }
                });

                if (isWordComplete) {
                    lettersContainer.classList.add("finished");

                    let div = document.createElement("div");
                    div.className = "pop";

                    let divText = document.createTextNode(`Congratulations! You Win!`);
                    div.appendChild(divText);
                    let againBtn = document.createElement("button");
                    againBtn.innerHTML = "again";
                    againBtn.className = "again";
                    div.appendChild(againBtn);
                    againBtn.onclick = function () {
                        location.reload()
                    }

                    document.body.appendChild(div);
                }
            }
        }
    }
})

