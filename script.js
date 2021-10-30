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
        Game.generatePlayers();
        this.player1.toggleActive();
        this.moveCount = 0;
    },

    generatePlayers: function () {
        this.player1 = Player('Matt', 'x');
        this.player2 = Player('Lyra', 'o');
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
        if (this.moveCount > 8) {
            console.log('Tie game!');
        }
    },

    gameOver: function (winningSymbol) {
        if (winningSymbol === 'x') {
            console.log(`${this.player1.getName()} has won the game!`);
            this.reset();
        } else if (winningSymbol === 'o') {
            console.log(`${this.player2.getName()} has won the game!`);
            this.reset();
        }
    },

    reset: function () {
        let firstRound = false;
        delete this.player1;
        delete this.player2;
        Gameboard.clearBoard();
        Game.initGame(firstRound);
    },
};

Game.initGame();
