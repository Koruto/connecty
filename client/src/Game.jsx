import GameRender from './Components/GameRender';
import gameLogic from './Components/GameLogic';
import { useImmer, useImmerReducer } from 'use-immer';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
// const socket = '';

socket.on('connect', () => {
  console.log('connection established');
});

function reverseArray(board) {
  const reversedArray = Array.from(
    { length: board[0].length },
    (_, columnIndex) => {
      return board.map((row) => row[columnIndex]);
    }
  );
  return reversedArray;
}

export const ACTION_TYPE = {
  ADD_TILE: 'add_tile',
  SWITCH_PLAYER: 'switch_player',
  RESET_GAME: 'reset_game',
};

const initialState = {
  board: [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ],
  currentPlayer: 'one',
  win: false,
  draw: false,
  clickedTile: [null, null, null],
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.ADD_TILE: {
      const inverseArray = reverseArray(state.board);
      if (inverseArray[0][action.payload]) {
        return;
      }
      for (const [index, row] of inverseArray.entries()) {
        if (row[action.payload]) {
          inverseArray[index - 1][action.payload] = state.currentPlayer;
          state.clickedTile = [index - 1, action.payload, state.currentPlayer];
          break;
        }
        if (index == 5) {
          inverseArray[index][action.payload] = state.currentPlayer;
          state.clickedTile = [index, action.payload, state.currentPlayer];
        }
      }
      state.currentPlayer == 'one'
        ? (state.currentPlayer = 'two')
        : (state.currentPlayer = 'one');
      state.win = gameLogic.checkWin(
        inverseArray,
        state.clickedTile,
        state.win
      );
      state.draw = gameLogic.checkDraw(inverseArray, state.win);
      state.board = reverseArray(inverseArray);
      return state;
    }
    case ACTION_TYPE.RESET_GAME: {
      // state = initialState;
      // console.log(state);
      return initialState;
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function Game() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    socket.on('add_til', (columnIndex) => {
      console.log(columnIndex);

      addTile(columnIndex);
    });
    return () => {
      socket.off('add_til');
    };
  }, [socket]);

  function addTile(columnIndex) {
    dispatch({
      type: ACTION_TYPE.ADD_TILE,
      payload: columnIndex,
    });
  }

  return (
    <>
      <GameRender
        board={state.board}
        dispatch={dispatch}
        win={state.win}
        socket={socket}
      />
      <button
        className="bg-red-500"
        onClick={() => dispatch({ type: ACTION_TYPE.RESET_GAME })}
      >
        RESET
      </button>
    </>
  );
}

export default Game;
