let currentScore = 0;
let match = false;
let inArow = 0;
let rounds = 50;
const numberOfHighScores = 10;

function random() {
    randomInteger = Math.floor(Math.random() * 5) + 1;
    return randomInteger;
}

function printCurrentScore(element) {

    element.textContent = currentScore;
    console.log("current score added");

}
function printWinResult(element, text) {
    element.textContent = text;
}

function printLossResult(element) {
    element.textContent = "No match.. again! Faster!"
}

function setCurrentScore(number) {
    currentScore += number;
    const scoreElement = document.querySelector("#currentScore");
    flashEffect(scoreElement);

}
/**
 * Creates a flashing visual effect when triggered
 * @param {*} element 
 */
function flashEffect(element) {
    element.style.fontSize = '18px'; // Increase size
    element.style.color = 'red';
    setTimeout(() => {
        element.style.fontSize = '16px'; // Revert 
        element.style.color = ''; //Revert
    }, 70); // Revert after 0.5 seconds
}

function matcher(inputNumber, random) {
    if (inputNumber === random) {
        match = true;
        inArow++;
        return true;
    }
    else {
        match = false;
        inArow = 0;
        return false;
    }
}

function scoreUpdater() {
    const resultElement = document.querySelector("#result");
    if (match) {
        if (inArow === 2) {
            setCurrentScore(3);
            printWinResult(resultElement, "Two in a row!");
        }
        else if (inArow > 2) {
            setCurrentScore(5);
            printWinResult(resultElement, "Wow you are on a winning streak!");
        }
        else {
            setCurrentScore(1);
            printWinResult(resultElement, "It's a match!");
        }
        console.log("Score updated");
    } else {
        printLossResult(resultElement);
    }

}


function randomUpdater() {
    const gameHeader = document.querySelector("#random");
    let number = random();
    gameHeader.textContent = number;
    console.log("Random number updated");
    return number;
}

/**
 * Fetches map from API and converts it to div
 * @param {*} element a div or html element
 */
function printHighScore(element) {

    fetch("http://localhost:8080/highscore")
        .then((response) => {
            if (!response.ok) {
                throw new Error('no network respone ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data fetched:", data);

            //data is the imported map from API, number is size of list to display
            const highScoreList = createHighScoreList(data, numberOfHighScores);

            element.appendChild(highScoreList);

            // Creating a global variable of the friends list using "window". This is used in the search function
            window.highScores = data;
            console.log("PhoneBook fetched");
        })
        .catch(error => {
            console.error("Error fetching the phone book:", error);
        });
}

/**
 * 
 * @param {*} data imported map from api
 * @param {*} listSize number of elements you want to display on the html see also croplist function
 * @returns a <ol> list including highscores
 */

function createHighScoreList(dataList, listSize) {
    const highScoresDiv = document.createElement("ol");

    for (i = 0; i < listSize && i < dataList.length; i++) {

        const highScore = dataList[i];

        const scoreEntry = createHighScoreEntry(highScore);
        const listItem = document.createElement("li");

        //    const scoreDiv = document.createElement("div");
        // scoreDiv.className = "highScores";
        //   scoreDiv.appendChild(scoreEntry);
        listItem.appendChild(scoreEntry);

        highScoresDiv.appendChild(listItem);
    }
    return highScoresDiv;
}

function createHighScoreEntry(highScore) {
    const entry = document.createElement("p");
    entry.textContent = highScore.name + ", Score: " + highScore.score + "p. " + highScore.date; // Assuming `friend` has a `name` property
    return entry;
}

/**
 * 
 * @param {*} data map from API
 * @param {*} listSize the number of entries the highscore list should display
 * @returns 
 */
function cropList(data, listSize) {

    const entries = Object.entries(data);
    const top3Entries = entries.slice(0, listSize);

    return top3Entries;

}

function roundsUpdater() {
    rounds--;
    const roundsLeft = document.querySelector("#rounds");
    roundsLeft.textContent = "Round: " + rounds;
}

/**
 * Clearing the high score list completely. 
 * Not used
 */
function deleteHighScores(){
    fetch(`http://localhost:8080/highscore/clear`, {
        method: 'DELETE'
    })
        .then(() => {
            console.log(`High score list deleted successfully.`);
            refreshHighScoreList(); // clearing and updating the current list.
        })
        .catch(error => console.error('Error deleting high scores:', error));
}


/**
 * adding highscore to the backend list
 * @param {*} name 
 * @param {*} score 
 */
function addHighScore(name, score) {
    fetch(`http://localhost:8080/highscore/${encodeURIComponent(name)}/${encodeURIComponent(score)}`, {
        method: 'POST'
    })
        .then(() => {
            console.log(`High score for ${name} added successfully.`);
            refreshHighScoreList(); // adds the high score after clearing the current list.
        })
        .catch(error => console.error('Error adding the high score:', error));
}

//form for adding High score
const modal = document.querySelector("#addHighScoreModal");

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function showForm() {
    modal.style.display = "block";
}

// hides the add form(the x icon in the modal)
const closeBtn = document.querySelector(".close");
closeBtn.onclick = () => {
    modal.style.display = "none";
}

// Handle form submission (you can customize this part)
const addHighScoreForm = document.getElementById("addHighScoreForm");

addHighScoreForm.onsubmit = (event) => {
    event.preventDefault();
    // Here you can add logic to handle the form submission, e.g., save the data
    const playerName = document.getElementById("name").value;
    // const phoneNumber = document.getElementById("phoneNumber").value;
    console.log("Adding high score: ", playerName, currentScore);
    addHighScore(playerName, currentScore);

    addHighScoreForm.reset();
    // Close the modal after submission
    modal.style.display = "none";
};

/**
 * clearing the list and fetching it again for display. 
 * see printHighScore and createHighScoreList()
 */
function refreshHighScoreList() {
    const phoneBookContainer2 = document.querySelector("#highScoreContainer");
    highScoreContainer.innerHTML = '<h3>High Scores</h3>'; // Empty everything by adding a new header
    printHighScore(highScoreContainer); // Fetching the new list.
}


document.addEventListener("DOMContentLoaded", () => {
    const currentScoreElement = document.querySelector("#currentScore");
    printCurrentScore(currentScoreElement);
    

    const highScoreContainer = document.querySelector("#highScoreContainer");
    printHighScore(highScoreContainer);
   
    const gameForm = document.querySelector("#gameForm");
    gameForm.addEventListener("submit", (event) => {

        //if there is no value in form do not submit
        event.preventDefault();
        if (rounds >0) {
            const guessInput = document.querySelector("#inputNumber");
            const guessValue = Number(guessInput.value);
            console.log("play button clicked");

            const randomNumber = randomUpdater();
            matcher(guessValue, randomNumber);
            scoreUpdater(); // current score

            roundsUpdater(); //rounds left
            
            printCurrentScore(currentScoreElement); 
        } else {
          gameOver(); // Game ends
        }



    });


/**
 * Info when game ends
 */    
function gameOver(){
    const message = document.querySelector("#result");
    result.innerHTML = 'GAME OVER, <a href="javascript:window.location.reload(true)">reload</a> to play again.';
    const gameHeader = document.querySelector("#gameHeader");
    gameHeader.innerHTML = "Total score: " + currentScore;
    const randomElement = document.querySelector("#random");
    randomElement.innerHTML = ' <a href="#" onclick="showForm()">Register High Score</a>';
}

});
