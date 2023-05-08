import GameRender from './Components/GameRender';
import gameLogic from './Components/GameLogic';
import { useImmer, useImmerReducer } from 'use-immer';

export const ACTION_TYPE = {
  ADD_TILE: 'add_tile',
  SWITCH_PLAYER: 'switch_player',
  RESET_GAME: 'reset_game',
};

const initialState = {
  board: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  currentPlayer: 'one',
  win: false,
  draw: false,
  clickedTile: [null, null, null],
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.ADD_TILE: {
      if (state.board[0][action.payload]) return;
      for (const [index, row] of state.board.entries()) {
        if (row[action.payload]) {
          state.board[index - 1][action.payload] = state.currentPlayer;
          state.clickedTile = [index - 1, action.payload, state.currentPlayer];
          break;
        }
        if (index == 5) {
          state.board[index][action.payload] = state.currentPlayer;
          state.clickedTile = [index, action.payload, state.currentPlayer];
        }
      }
      state.currentPlayer == 'one'
        ? (state.currentPlayer = 'two')
        : (state.currentPlayer = 'one');
      state.win = gameLogic.checkWin(state.board, state.clickedTile);
      state.draw = gameLogic.checkDraw(state.board, state.win);
      return state;
    }
    case ACTION_TYPE.RESET_GAME: {
      return initialState;
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <>
      <GameRender board={state.board} dispatch={dispatch} win={state.win} />
      <button
        className="bg-red-500"
        onClick={() => dispatch({ type: ACTION_TYPE.RESET_GAME })}
      >
        RESET
      </button>
    </>
  );
}

export default App;
