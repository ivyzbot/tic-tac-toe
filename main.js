 /*----- constants -----*/
 const color = {
    'null': 'green',
    '1': 'purple',
    '-1': 'orange'
 }

 const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
 ];


 /*----- state variables -----*/
// 1: player1, -1: player2
let turn; 
// 1: player1 wins, 2: player2 wins, T: tie
let winner;
let sqaures;


 /*----- cached elements  -----*/
 const board = document.getElementById('board');
 const sqauresEl = Array.from(document.querySelectorAll('#board > div'));
 const h1El = document.getElementById('turn-msg');
 const buttonEl = document.getElementById('play-again-btn');


 /*----- event listeners -----*/
board.addEventListener('click', clickSquare);
buttonEl.addEventListener('click', initialize);

 /*----- functions -----*/
 function initialize() {
    sqaures = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
 }

function render() {
    renderBoard();
    renderMessage();
}

function renderBoard() {
    sqaures.forEach(fillBoardColor);
}

function renderMessage() {
    const currentColor = color[turn].toUpperCase();
    
    if (!winner) {
        h1El.innerHTML = `<span class="${currentColor}">${currentColor}</span>'s Turn`;
    } else if (winner === 'T') {
        h1El.innerHTML = 'It\'s a tie!!!';
    } else {
        const currentWinner = color[winner].toUpperCase();
        h1El.innerHTML = `Congrates <span class="${currentWinner}">${currentWinner}</span>! You won!`
    }
}

 function clickSquare(event) {
    const idclicked = parseInt(event.target.id);
    if ( (sqaures[idclicked]) || (winner) ){
        return;
    } else {
        sqaures[idclicked] = turn;
        turn = -1 * turn;
        winner = checkWinner();
        console.log(winner);
    }

    render();
 }

 function fillBoardColor(sqaure, index) {
    const sqaureEl = sqauresEl[index];
    sqaureEl.style.backgroundColor = color[sqaure];
    if (!sqaure) {
        sqaureEl.className = "blank-box";
    } else {
        sqaureEl.className = "";
    }
 }

 function checkWinner() {
    for (let combo of winningCombos) {
        if (Math.abs(sqaures[combo[0]] + sqaures[combo[1]] + sqaures[combo[2]]) === 3) {
            return sqaures[combo[0]];
        }
    }

    if (sqaures.includes(null)) {
        return null;
    } else {
        return 'T';
    }
 }

 initialize();
