class Game {
    constructor() {
        this.init();
    }

    init() {
        // init board
        this._board = [];
        for (let i = 0; i < 3; ++i) {
            this._board[i] = [ Game.EMPTY, Game.EMPTY, Game.EMPTY ];
        }

        this.currentPlayer = 0;
        this.gameStatus = 0;
    }

    getBoard(x, y) {
        return this._board[x][y];
    }

    setBoard(x, y, value) {
        this._board[x][y] = value;
        Game.drawSlot(x, y, this.currentPlayer);
        return this;
    }

    slotSelect(x, y) {
        if (this.gameStatus === Game.END) return;
        if (this.getBoard(x, y) !== Game.EMPTY) return;

        this.setBoard(x, y, this.currentPlayer);
        this.checkBoard(x, y);

        ++this.currentPlayer;
        if (this.currentPlayer > 1) this.currentPlayer = 0;
    }

    static drawSlot(x, y, value) {
        let slot = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);

        if (value !== Game.EMPTY) {
            slot.classList.add("player" + value);
        }
        else {
            slot.class = '';
            slot.classList.add('slot');
        }
    }

    checkBoard(lastStepX, lastStepY) {
        let lastPlayer = this.getBoard(lastStepX, lastStepY);

        if (this.isRowEquals(lastPlayer, lastStepX)) {
            this.handleWin(lastPlayer);
        }
        else if (this.isColEquals(lastPlayer, lastStepY)) {
            this.handleWin(lastPlayer);
        }
        else if (this.isSlanting1Equals(lastPlayer)) {
            this.handleWin(lastPlayer);
        }
        else if (this.isSlanting2Equals(lastPlayer)) {
            this.handleWin(lastPlayer);
        }
    }

    handleWin(player) {
        this.gameStatus = Game.END;
        setTimeout(() => {alert("Player " + (player + 1) + " wins")}, 0);
    }

    bind(element) {
        while (element.firstChild) element.removeChild(element.firstChild);

        let game = this;
        let domBoard = document.createElement("table");
        for (let i = 0; i < 3; ++i) {
            let row = document.createElement("tr");
            for (let j = 0; j < 3; ++j) {
                let slot = document.createElement("td");
                slot.classList.add('slot');
                slot.dataset.x = j;
                slot.dataset.y = i;
                slot.addEventListener("click", e => {
                    game.slotSelect(j, i);
                });
                row.appendChild(slot);
            }
            domBoard.appendChild(row);
        }

        element.appendChild(domBoard);
    }

    isRowEquals(value, x) {
        for (let i = 0; i < 3; ++i) {
            if (this.getBoard(x, i) !== value) return false;
        }
        return true;
    }

    isColEquals(value, y) {
        for (let i = 0; i < 3; ++i) {
            if (this.getBoard(i, y) !== value) return false;
        }
        return true;
    }

    isSlanting1Equals(value) {
        for (let i = 0; i < 3; ++i) {
            if (this.getBoard(i, i) !== value) return false;
        }
        return true;
    }

    isSlanting2Equals(value) {
        for (let i = 0; i < 3; ++i) {
            if (this.getBoard(i, 2 - i) !== value) return false;
        }
        return true;
    }
}
Game.EMPTY = -1;
Game.END = -1;

window.addEventListener("load", main);
function main() {
    let game = new Game();
    game.bind(document.querySelector('.playArea'));
}