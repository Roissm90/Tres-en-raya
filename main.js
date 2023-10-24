let myBoard = document.querySelector('#board');
let startButton = document.getElementById('startGame');
let currentPlayer = document.querySelector('h1');
let player = 1;
let cells = [];


startButton.addEventListener('click', function() {
    myBoard.innerHTML = '';
    startButton.textContent = 'Volver a empezar';
    cells = [];

    for (let i = 0; i < 3; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement('td');
            cell.textContent = '-';
            cell.addEventListener('click', function() {
                addToken(cell);
            });
            row.appendChild(cell);
            cells.push(cell);
        }
        myBoard.appendChild(row);
    }
    player = 1;
    currentPlayer.textContent = 'Jugador 1';
});

function addToken(cell) {
    if (cell.textContent === '-') {
        if (player === 1) {
            cell.textContent = 'X';
            currentPlayer.textContent = 'Jugador 2';
            cell.className += "cellPlayerX";
        } else {
            cell.textContent = 'O';
            currentPlayer.textContent = 'Jugador 1';
            cell.className += "cellPlayerY";
        }
        player = 3 - player;
    }
    checkWinner();
}

function checkWinner() {   
    //Verifica filas
    for (let i = 0; i < 6; i += 3) {
        if ((cells[i].textContent !== '-') && (cells[i].textContent === cells[i + 1].textContent && cells[i + 1].textContent === cells[i + 2].textContent)) {
            currentPlayer.textContent = `¡Jugador ${player = 3 - player} ha ganado!`;
            return;
        }
    }

    //Verifica columnas
    for (let i = 0; i < 3; i++) {
        if ((cells[i].textContent !== '-') && (cells[i].textContent === cells[i + 3].textContent && cells[i + 3].textContent === cells[i + 6].textContent)) {
            currentPlayer.textContent = `¡Jugador ${player = 3 - player} ha ganado!`;
            return;
        }
    }

    //Verifica diagonales
    /*
    for (let i = 0; i < 3; i++) {
        if (
            (cells[i].textContent !== '-') && (cells[i].textContent === cells[i + 4].textContent && cells[i + 4].textContent === cells[i + 8].textContent) ||
            (cells[i + 2].textContent !== '-') && (cells[i + 2].textContent === cells[i + 4].textContent && cells[i + 4].textContent === cells[i + 6].textContent)
            ) {
            currentPlayer.textContent = `¡Jugador ${player = 3 - player} ha ganado!`;
            return;
        } 
    }
    */
    if (
        ((cells[0].textContent !== '-') && (cells[0].textContent === cells[4].textContent && cells[4].textContent === cells[8].textContent)) ||
        ((cells[2].textContent !== '-') && (cells[2].textContent === cells[4].textContent && cells[4].textContent === cells[6].textContent))
        ) {
        currentPlayer.textContent = `¡Jugador ${player = 3 - player} ha ganado!`;
        return;
    } 

    //Verifica empate
    checkTie();
}

function checkTie() {
    let fullCells = 0;

    for (let cell of cells) {
        if (cell.textContent !== '-') {
            fullCells++;
        }
    }

    if (fullCells === cells.length) {
        currentPlayer.textContent = '¡Empate, prueba otra vez!';
        currentPlayer.className = ' ';
    }
}