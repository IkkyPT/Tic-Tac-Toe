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
                // Switch the player and get the new mark
                const mark = Game.switchPlayers();
                // For each square clicked calls the placeMarker function
                placeMarker(row, col, mark);
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
        placeMarker
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
    let currPlayerIndex = 0;
    let gameOver;

    // Start the game function
    const start = () => {
        // Check Player1 mark and assign the other one to Player2
        const mark1 = GameProperties.getPlayerMark();
        const mark2 = mark1 === 'X' ? 'O' : 'X';
        players = [
            GameProperties.createPlayer("player1", mark1),
            GameProperties.createPlayer("player2", mark2)
        ]
        currPlayerIndex = 0;
        gameOver = false;
        GameBoard.render();
    }

    const switchPlayers = () => {
        currPlayerIndex = currPlayerIndex === 0 ? 1 : 0;
        return players[currPlayerIndex].mark;
    }

    return {
        start,
        switchPlayers
    }
})();

const startButton = document.querySelector('#start-game');

startButton.addEventListener('click', () => {
        Game.start();
})