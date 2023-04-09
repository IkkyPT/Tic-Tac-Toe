// Define a GameBoard module using an Immediately Invoked Function Expression (IIFE)
const GameBoard = (() => {

    // Define a variable to hold the game board array
    let gameBoard = [[1,2,3],[4,5,6],[7,8,9]];

    const squares = document.querySelectorAll('.game-board__field');

    // Define a function to render the game board
    const render = () => {
        squares.forEach((square, index) => {
            // Calculate the row and column indices for this square based on its index
            const row = Math.floor(index / 3);
            const col = index % 3;
            square.addEventListener('click', () => {
                if (square.textContent === ''){ // Interrupt users of replace the marker already exist in board
                    // Switch the player and get the new mark
                    const mark = Game.switchPlayers();
                    // For each square clicked calls the placeMarker function
                    placeMarker(row, col, mark);
                    // Check Win conditions
                    Game.checkWin();
                    // Update next player turn
                    Game.updateTurn();
                }
            });
        });
    }

    // Define a function to calculate the specified row and col indices from the squares array and place the marker
    const placeMarker = (row, col, mark) => {
        gameBoard[row][col] = mark;
        squares[row * 3 + col].innerHTML = `<div class="game-board__sign" id="game-board__sign__${mark}">${mark}</div>`;
    }

    return {
        render,
        placeMarker,
        gameBoard
    }
})();

// Define a GameProperties module using an Immediately Invoked Function Expression (IIFE)
const GameProperties = (() => {
    // Factory function to create the players
    const createPlayer = (name, mark) => {
        return {
            name, 
            mark
        }
    }

    // Get first player mark 
    const getPlayerMark = (mark) => {
        const cross = document.getElementById('x-marker');
        const round = document.getElementById('o-marker');
      
        if (cross.style.backgroundColor === 'var(--grey)') {
          cross.value = 'X';
          return mark = cross.value;
        } else {
          round.value = 'O';
          return mark = round.value;
        }
      };
      
    return {
        createPlayer,
        getPlayerMark
    }
})(); 

// Define a Game module using an Immediately Invoked Function Expression (IIFE)
const Game = (() => {
    // Game control variables
    let players = [];
    let currPlayerIndex;
    let gameOver;
    let turn = 0;

    // Start the game function
    const start = () => {
        // Check Player1 mark and assign the other one to Player2
        const mark1 = GameProperties.getPlayerMark();
        const mark2 = mark1 === 'X' ? 'O' : 'X';
        // Create the players
        players = [
            GameProperties.createPlayer("player1", mark1),
            GameProperties.createPlayer("player2", mark2)
        ]
        currPlayerIndex = 0;
        gameOver = false;
        GameBoard.render();
    }

    const switchPlayers = () => {
        if (turn == 0) {
            turn++;
            return players[currPlayerIndex].mark
        }
        else {
            currPlayerIndex = currPlayerIndex === 0 ? 1 : 0;
            return players[currPlayerIndex].mark;
        }
    }

    // Display next mark to be placed
    const updateTurn = () => {
        const markTurn = document.querySelector('.marker-type');
        nextMark = currPlayerIndex === 0 ? 1 : 0;
        markTurn.textContent = players[nextMark].mark;
    }

    // Check win conditions
    const checkWin = () => {

        const mark = players[currPlayerIndex].mark;
        
        // Check Rows
        for (let i = 0; i < 3; i++){
            if (GameBoard.gameBoard[i][0] === mark && GameBoard.gameBoard[i][1] === mark && GameBoard.gameBoard[i][2] === mark){
                gameOver = true;
                return console.log('win');
                return true;
            }
        }

        // Check Columns
        for (let i = 0; i < 3; i++){
            if (GameBoard.gameBoard[0][i] === mark && GameBoard.gameBoard[1][i] === mark && GameBoard.gameBoard[2][i] === mark){
                gameOver = true;
                return console.log('win');
                return true;
            }
        }

        // Check Diagonals
        if (GameBoard.gameBoard[0][0] === mark && GameBoard.gameBoard[1][1] === mark && GameBoard.gameBoard[2][2] === mark) {
            gameOver = true;
            return console.log('win');
            return true;
        }
        if (GameBoard.gameBoard[0][2] === mark && GameBoard.gameBoard[1][1] === mark && GameBoard.gameBoard[2][0] === mark) {
            gameOver = true;
            return console.log('win');
            return true;
        }

        // No win condition met 
        return false;
    }

    return {
        start,
        switchPlayers,
        updateTurn,
        checkWin
    }
})();

const startButton = document.querySelector('#start-game');

startButton.addEventListener('click', () => {
        Game.start();
})