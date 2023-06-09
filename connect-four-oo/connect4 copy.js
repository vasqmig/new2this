/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game {
  constructor(p1, p2, height = 6, width = 7) {
    this.players = [p1, p2];
    this.height = height;
    this.width = width;
    this.currPlayer = p1;
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameOver = false;
  }
  makeBoard() {
    this.board = [];
    for (let y = 0; y < this.height; y++) {
      board.push(Array.from({ length: this.width }));
    }
  }
  makeHtmlBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);
    this.handleGameClick = this.handleClick.bind(this);
    for (let x = 0; x < WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    board.append(top);
    for (let y = 0; y < HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }
  findSpotForCol(x) {
    for (let y = HEIGHT - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  }
  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  endGame(msg) {
    alert(msg);
    const top = document.querySelector("#column-top");
    top.removeEventListener("click", this.handleGameClick);
  }
  handleClick(evt) {
    const x = +evt.target.id;
    const y = findSpotForCol(x);
    if (y === null) {
      return;
    }
    this.board[y][x] = currPlayer;
    this.placeInTable(y, x);

    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.color} won!`);
    }

    if (board.every((row) => row.every((cell) => cell))) {
      return endGame("Tie!");
    }
    this.currPlayer =
      this.currPlayer === this.players[0] ? this.player[1] : this.players[0];
  }
  checkForWin() {
    function _win(cells) {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < HEIGHT &&
          x >= 0 &&
          x < WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}
document.getElementById("start-game").addEventListener("click", () => {
  let p1 = new Player(document.getElementById("p1-color").value);
  let p2 = new Player(document.getElementById("p2-color").value);
  new Game(p1, p2);
});
