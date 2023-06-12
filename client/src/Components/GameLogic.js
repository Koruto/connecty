let board = null;
let clickedTile = null;
let win = false;
/** check for draw */
function highlightWin(i, j, x = clickedTile[0], y = clickedTile[1]) {
  for (let a = 0; a < 4; a++)
    board[x + a * i][y + a * j] = '9-' + clickedTile[2];
  win = true;
}

function checkWinHorizontal() {
  let count = 0;
  for (const [index, tile] of board[clickedTile[0]].entries()) {
    if (tile == clickedTile[2]) count++;
    else count = 0;
    if (count == 4) {
      console.log(clickedTile[2] + ' Won Horizontally');
      highlightWin(0, -1, undefined, index);
    }
  }
}

function checkWinVertical() {
  let count = 0;
  for (const tile of board) {
    if (tile[clickedTile[1]] == clickedTile[2]) count++;
    else count = 0;
    if (count == 4) {
      console.log(clickedTile[2] + ' Won Vertically');
      highlightWin(1, 0);
    }
  }
}

function checkWinLeftRightDiagonal() {
  let count = 0;
  let x = clickedTile[0];
  let y = clickedTile[1];
  let minOfTwoCoords = Math.min(x, y);
  x = x - minOfTwoCoords;
  y = y - minOfTwoCoords;
  while (x < 6 && y < 7) {
    board[x][y] == clickedTile[2] ? count++ : (count = 0);
    if (count == 4) {
      console.log(clickedTile[2] + ' Won LtR Diagonal Top');
      highlightWin(-1, -1, x, y);
    }
    x++;
    y++;
  }
}

function checkWinLeftRightDiagonalBottom() {
  let count = 0;
  let x = clickedTile[0];
  let y = clickedTile[1];
  if (x + y <= 5) {
    x = x + y;
    y = 0;
  } else {
    x = 5;
    y = x + y - 5;
  }
  while (x >= 0 && y < 7) {
    board[x][y] == clickedTile[2] ? count++ : (count = 0);
    if (count == 4) {
      console.log(clickedTile[2] + ' Won LtR Diagonal Bottom');
      highlightWin(1, -1, x, y);
    }
    x--;
    y++;
  }
}

const gameLogic = {
  checkWin(gameBoard, checkTile, originalWin) {
    board = gameBoard;
    clickedTile = checkTile;
    win = originalWin;
    checkWinHorizontal();
    checkWinVertical();
    checkWinLeftRightDiagonal();
    checkWinLeftRightDiagonalBottom();

    return win;
  },
  checkDraw(gameBoard, win) {
    if (win) return false;
    for (const tile of gameBoard[0]) {
      if (!tile) return false;
    }
    return true;
  },
};

export default gameLogic;
