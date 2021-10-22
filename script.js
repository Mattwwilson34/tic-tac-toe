/// Gameboard module
const Gameboard = {
    board: [],
    squareArray: [],
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
        for (let i = 0; i < 9; i++) {
            const newSquareDiv = document.createElement('div');
            this.squareArray.push(newSquareDiv);
        }
    },
    setElemClassesAndAttributes: function () {
        this.boardWrapper.classList = 'board-wrapper';
        this.newBoardDiv.classList = 'board';
        this.squareArray.forEach((square, i) => {
            square.classList = 'square';
            square.setAttribute('data-square-index', `${i}`);
        });
    },
    appendElements: function () {
        this.wrapper.append(this.boardWrapper);
        this.boardWrapper.append(this.newBoardDiv);
        this.squareArray.forEach((square) => {
            this.newBoardDiv.append(square);
        });
    },
    bindEvents: function () {
        this.squareArray.forEach((square) => {
            square.addEventListener('click', Game.makeMove);
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
    initGame: function () {
        Gameboard.render();
        Game.generatePlayers();
        this.player1.toggleActive();
    },
    generatePlayers: function () {
        this.player1 = Player('player1', 'x');
        this.player2 = Player('player2', 'o');
    },
    checkActivePlayer: function () {
        if (this.player1.getActive()) {
            return this.player1.getName();
        } else {
            return this.player2.getName();
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
    checkForWinner: function () {
        const board = Gameboard.squareArray;
        const winConditions = [
            [0, 1, 2], // rows
            [3, 4, 5], // rows
            [6, 7, 8], // rows
            [0, 3, 6], // columns
            [1, 4, 7], // columns
            [2, 5, 8], // columns
            [0, 4, 8], // diagnols
            [2, 4, 6], // diagnols
        ];
        console.log(winConditions);
    },
    makeMove: function (e) {
        const activePlayer = Game.checkActivePlayer();
        const activePlayerSymbol = Game[activePlayer].getSymbol();
        const squareIndex = this.getAttribute('data-square-index');
        const square = Gameboard.squareArray[squareIndex];
        if (Game.checkIfSquareEmpty(square)) {
            square.textContent = activePlayerSymbol;
            Game.changePlayer();
        } else return;
        Game.checkForWinner();
    },
    printPlayers: function () {
        console.log(this.player1);
        console.log(this.player2);
    },
};

Game.initGame();
