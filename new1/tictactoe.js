var State;
(function (State) {
    State[State["Empty"] = 0] = "Empty";
    State[State["X"] = 1] = "X";
    State[State["O"] = 2] = "O";
})(State || (State = {}));
var Cell = /** @class */ (function () {
    function Cell() {
        this.state = State.Empty;
    }
    Cell.prototype.SetState = function (s) {
        this.state = s;
    };
    return Cell;
}());
var Board = /** @class */ (function () {
    function Board(t) {
        this.table = t;
        this.player = true;
        this.board = [new Cell, new Cell, new Cell, new Cell, new Cell, new Cell, new Cell, new Cell, new Cell];
    }
    Board.prototype.horizontalWin = function (b) {
        if (b[0].state == b[1].state && b[1].state == b[2].state && b[1].state != State.Empty ||
            b[3].state == b[4].state && b[4].state == b[5].state && b[4].state != State.Empty ||
            b[6].state == b[7].state && b[7].state == b[8].state && b[7].state != State.Empty) {
            return true;
        }
        return false;
    };
    Board.prototype.verticalWin = function (b) {
        if (b[0].state == b[3].state && b[3].state == b[6].state && b[3].state != State.Empty ||
            b[1].state == b[4].state && b[4].state == b[7].state && b[4].state != State.Empty ||
            b[2].state == b[5].state && b[5].state == b[8].state && b[5].state != State.Empty) {
            return true;
        }
        return false;
    };
    Board.prototype.diagonalWin = function (b) {
        if (b[0].state == b[4].state && b[4].state == b[8].state && b[4].state != State.Empty ||
            b[2].state == b[4].state && b[4].state == b[6].state && b[4].state != State.Empty) {
            return true;
        }
        return false;
    };
    Board.prototype.click = function (c) {
        if (this.board[c].state == State.Empty) {
            if (this.player) {
                this.board[c].SetState(State.X);
                this.table[c].innerHTML = "X";
            }
            else {
                this.board[c].SetState(State.O);
                this.table[c].innerHTML = "O";
            }
            if (this.horizontalWin(this.board) || this.verticalWin(this.board) || this.diagonalWin(this.board)) {
                alert("Wygrałeś!");
            }
            if (this.draw()) {
                alert("Remis!");
            }
            this.player = !this.player;
        }
    };
    Board.prototype.draw = function () {
        for (var c in this.board) {
            if (this.board[c].state == State.Empty) {
                return false;
            }
        }
        return true;
    };
    return Board;
}());
window.onload = function () {
    var cell0 = document.getElementById("cell0");
    var cell1 = document.getElementById("cell1");
    var cell2 = document.getElementById("cell2");
    var cell3 = document.getElementById("cell3");
    var cell4 = document.getElementById("cell4");
    var cell5 = document.getElementById("cell5");
    var cell6 = document.getElementById("cell6");
    var cell7 = document.getElementById("cell7");
    var cell8 = document.getElementById("cell8");
    var buttonArray = [cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8];
    var game = new Board(buttonArray);
    var _loop_1 = function (index) {
        buttonArray[index].addEventListener('click', function () { game.click(index); });
    };
    for (var index = 0; index < buttonArray.length; index++) {
        _loop_1(index);
    }
};
