/// Gameboard module
const Gameboard = {
    board: [[], [], []],

    render: function () {
        this.createBoardElements();
        this.setElemClassesAndAttributes();
        this.appendElements();
        this.bindEvents();
    },

    createBoardElements: function () {
        this.wrapper = document.querySelector('.wrapper');
        this.boardWrapper = document.createElement('div');
        this.newBoardDiv = document.createElement('div');
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const boardSquare = document.createElement('div');
                this.board[i].push(boardSquare);
            }
        }
    },

    setElemClassesAndAttributes: function () {
        this.boardWrapper.classList = 'board-wrapper';
        this.newBoardDiv.classList = 'board';
        let boardSquareIndex = 0;
        this.board.forEach((squareArray) => {
            squareArray.forEach((square) => {
                square.classList = 'square';
                square.setAttribute('data-square-index', `${boardSquareIndex}`);
                boardSquareIndex++;
            });
        });
    },

    appendElements: function () {
        this.wrapper.append(this.boardWrapper);
        this.boardWrapper.append(this.newBoardDiv);
        this.board.forEach((squareArray) => {
            squareArray.forEach((square) => {
                this.newBoardDiv.append(square);
            });
        });
    },

    bindEvents: function () {
        this.board.forEach((squareArray) => {
            squareArray.forEach((square) => {
                square.addEventListener('click', Game.makeMove);
            });
        });
    },

    clearBoard: function () {
        this.board.forEach((squareArray) => {
            squareArray.forEach((square) => {
                square.textContent = '';
            });
        });
    },
};

/// player factory function
const Player = (name, symbol) => {
    let activePlayer = false;
    const getName = () => name;
    const getSymbol = () => symbol;
    const getActive = () => activePlayer;
    const toggleActive = () => {
        activePlayer = !activePlayer;
    };
    return { activePlayer, getName, getSymbol, getActive, toggleActive };
};

/// Game module
const Game = {
    initGame: function (firstRound = 'true') {
        if (firstRound) {
            Gameboard.render();
        }
        this.gameIsOver = false;
        this.generatePlayers();
        this.bindEvents();
        this.player1.toggleActive();
        this.moveCount = 0;
    },

    generatePlayers: function () {
        player1Name = prompt('Enter a name for player1. They will be crosses.');
        while (player1Name === '') {
            player1Name = prompt('Name cannot be blank.');
        }
        player2Name = prompt('Enter a name for player2. They will be circles.');
        while (player2Name === '') {
            player2Name = prompt('Name cannot be blank.');
        }

        this.player1 = Player(player1Name, 'x');
        this.player2 = Player(player2Name, 'o');
    },

    bindEvents: function () {
        this.resetBtn = document.querySelector('.reset');
        this.resetBtn.addEventListener('click', this.reset);
    },

    checkActivePlayer: function () {
        if (this.player1.getActive()) {
            return 'player1';
        } else {
            return 'player2';
        }
    },

    changePlayer: function () {
        this.player1.toggleActive();
        this.player2.toggleActive();
    },

    checkIfSquareEmpty: function (square) {
        if (square.textContent === '') {
            return true;
        } else return false;
    },

    makeMove: function (e) {
        const activePlayer = Game.checkActivePlayer();
        const activePlayerSymbol = Game[activePlayer].getSymbol();
        const square = this;
        Game.moveCount++;
        if (Game.checkIfSquareEmpty(square)) {
            square.textContent = activePlayerSymbol;
            Game.changePlayer();
        } else return;
        if (Game.moveCount > 4) {
            Game.checkForWinner();
        }
    },

    checkForWinner: function () {
        const board = Gameboard.board;
        const txt = 'textContent';

        //! XXXX
        ///Rows
        if (board[0][0][txt] === 'x' && board[0][1][txt] === 'x' && board[0][2][txt] === 'x') {
            this.gameOver('x');
        } else if (board[1][0][txt] === 'x' && board[1][1][txt] === 'x' && board[1][2][txt] === 'x') {
            this.gameOver('x');
        } else if (board[2][0][txt] === 'x' && board[2][1][txt] === 'x' && board[2][2][txt] === 'x') {
            this.gameOver('x');
        }
        ///Columns
        if (board[0][0][txt] === 'x' && board[1][0][txt] === 'x' && board[2][0][txt] === 'x') {
            this.gameOver('x');
        } else if (board[0][1][txt] === 'x' && board[1][1][txt] === 'x' && board[2][1][txt] === 'x') {
            this.gameOver('x');
        } else if (board[0][2][txt] === 'x' && board[1][2][txt] === 'x' && board[2][2][txt] === 'x') {
            this.gameOver('x');
        }
        ///Diagonal
        if (board[0][0][txt] === 'x' && board[1][1][txt] === 'x' && board[2][2][txt] === 'x') {
            this.gameOver('x');
        } else if (board[0][2][txt] === 'x' && board[1][1][txt] === 'x' && board[2][0][txt] === 'x') {
            this.gameOver('x');
        }
        //!ooooooo
        ///Rows
        if (board[0][0][txt] === 'o' && board[0][1][txt] === 'o' && board[0][2][txt] === 'o') {
            this.gameOver('o');
        } else if (board[1][0][txt] === 'o' && board[1][1][txt] === 'o' && board[1][2][txt] === 'o') {
            this.gameOver('o');
        } else if (board[2][0][txt] === 'o' && board[2][1][txt] === 'o' && board[2][2][txt] === 'o') {
            this.gameOver('o');
        }
        ///Columns
        if (board[0][0][txt] === 'o' && board[1][0][txt] === 'o' && board[2][0][txt] === 'o') {
            this.gameOver('o');
        } else if (board[0][1][txt] === 'o' && board[1][1][txt] === 'o' && board[2][1][txt] === 'o') {
            this.gameOver('o');
        } else if (board[0][2][txt] === 'o' && board[1][2][txt] === 'o' && board[2][2][txt] === 'o') {
            this.gameOver('o');
        }
        ///Diagonal
        if (board[0][0][txt] === 'o' && board[1][1][txt] === 'o' && board[2][2][txt] === 'o') {
            this.gameOver('o');
        } else if (board[0][2][txt] === 'o' && board[1][1][txt] === 'o' && board[2][0][txt] === 'o') {
            this.gameOver('o');
        }

        ///Check for tie
        if (this.moveCount > 8 && !this.gameIsOver) {
            this.gameOver();
        }
    },

    gameOver: function (winningSymbol = 'tie') {
        this.gameIsOver = true;
        if (winningSymbol === 'x') {
            this.winningPlayer = this.player1.getName();
            this.displayWinner();
        } else if (winningSymbol === 'o') {
            this.winningPlayer = this.player2.getName();
            this.displayWinner();
        } else {
            this.winningPlayer = 'Tie game! Neither player';
            this.displayWinner();
        }
    },

    displayWinner: function () {
        DisplayController.displayWinnerOverlay();
        DisplayController.bindEvents();
    },

    reset: function () {
        this.gameIsOver = false;
        let firstRound = false;
        delete this.player1;
        delete this.player2;
        Gameboard.clearBoard();
        DisplayController.hideWinnerOverlay();
        Game.initGame(firstRound);
    },
};

const DisplayController = {
    displayWinnerOverlay: function () {
        this.overlay = document.querySelector('.overlay');
        this.modal = document.querySelector('.modal');
        this.modal.textContent = `${Game.winningPlayer} has won the game!`;
        this.addModalResetBtn();
        this.overlay.style.display = 'block';
        this.modal.style.display = 'block';
    },
    hideWinnerOverlay: function () {
        this.overlay.style.display = 'none';
        this.modal.style.display = 'none';
    },
    addModalResetBtn: function () {
        this.modalResetBtn = document.createElement('button');
        this.modalResetBtn.classList = 'modal-reset';
        this.modalResetBtn.textContent = 'Reset';
        this.modal.append(this.modalResetBtn);
    },
    bindEvents: function () {
        this.modalResetBtn.addEventListener('click', Game.reset);
    },
};

Game.initGame();
