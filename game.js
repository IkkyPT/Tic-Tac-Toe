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
                placeMarker(row, col, 'X');
            });
        });
    }

    const placeMarker = (row, col, marker) => {
        gameBoard[row][col] = marker;
        squares[row * 3 + col].innerHTML = `<div class="game-board__sign" id="game-board__sign__${marker}">${marker}</div>`;
    }

    return {
        render,
        placeMarker
    }
})();


const startButton = document.querySelector('#start-game');

startButton.addEventListener('click', () => {
    GameBoard.render();
})