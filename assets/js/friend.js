let youScore = 0;
let cpuScore = 0;
let ties = 0;

let STATUS_GAME = document.querySelector("#statusGame");

    GAME_STATE = ["","","","","","","","","",],
    WINNINGS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
],
WIN_MESSAGE = ()=> `El jugador ${currentPlayer} ha ganado!`,
DRAW_MESSAGE = () => `Empate`,
CURRENT_PLAYER_TURN = () => `Player '${currentPlayer}' turn`

// Variables
let gameActive = true,
circleOrX = ["X", "0"];
currentPlayer = circleOrX[Math.floor(Math.random() * 2)]

// Functions
function main() {
    handleStatusDisplay(CURRENT_PLAYER_TURN());
    listeners()
}

main()

function handleStatusDisplay(message) {
    STATUS_GAME.innerHTML = message
}

function listeners() {
    document.querySelector('#gameContainer').addEventListener("click", handleCellClick)
    // document.querySelector('.game-restart').addEventListener('click', handleRestartGame)
}

function handleCellClick(clickedEvent) {
    const clickedCell = clickedEvent.target;
    if(clickedCell.classList.contains('box')) {
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell);
        if(GAME_STATE[clickedCellIndex] !== '' || !gameActive) {
            return
        }
        handleCellPlayed(clickedCell, clickedCellIndex);
        gameActive = true;
        handleResultValidation();
    }
}

function handleCellPlayed (clickedCell, clickedCellIndex) {
    GAME_STATE[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
}

function handleResultValidation () {
    let roundWon = false
    let winCondition;
    for(let i = 0; i < WINNINGS.length; i++) {
        winCondition = WINNINGS[i],
        position1 = GAME_STATE[winCondition[0]],
        position2 = GAME_STATE[winCondition[1]],
        position3 = GAME_STATE[winCondition[2]]
        if(position1 === "" || position2 === "" || position3 === "") {
            continue;
        }
        if(position1 === position2 && position2 === position3) {
            roundWon = true
            
            break;
        }
    }

    if(roundWon) {
        if(currentPlayer === 'X') {
            youScore++;
            document.querySelector('#youScoreSpan').textContent = youScore; 
          } else {
            cpuScore++; 
            document.querySelector('#cpuScoreSpan').textContent = cpuScore; 
          }

        handleStatusDisplay(WIN_MESSAGE());
        gameActive = false;

        for (let i = 0; i < winCondition.length; i++) {
            const winningCellIndex = winCondition[i];
            const winningCell = document.querySelectorAll('.box')[winningCellIndex];
            winningCell.classList.add('winning-cell');
        }
        document.querySelector('#gameContainer').addEventListener("click", handleRestartGame)
        return
    }

    let roundDraw = !GAME_STATE.includes('')

    if(roundDraw) {
        ties++; 
        document.querySelector('#tiesSpan').textContent = ties;
        handleStatusDisplay(DRAW_MESSAGE())
        gameActive = false
        
        
        document.querySelector('#gameContainer').addEventListener("click", handleRestartGame)
        return
    }

    handlePlayerChange()

}



function handlePlayerChange() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
    handleStatusDisplay(CURRENT_PLAYER_TURN());
}

function handleRestartGame() {
    GAME_STATE = ["","","","","","","","","",];
    document.querySelectorAll('.box').forEach(cell => cell.innerText = '');
    document.querySelectorAll('.box').forEach(cell => cell.classList.remove('winning-cell'));
    gameActive = true;
    
   
    document.querySelector('#gameContainer').removeEventListener("click", handleRestartGame)
}
