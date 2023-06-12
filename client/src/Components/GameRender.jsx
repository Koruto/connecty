import Row from './Row';

function GameRender(props) {
  // props.board.forEach((value) => <Cell columns={value} />);

  return (
    <div className="flex  ">
      {props.board.map((boardRow, rowIndex) => {
        return (
          <Row
            key={rowIndex}
            index={rowIndex}
            boardRow={boardRow}
            dispatch={props.dispatch}
            win={props.win}
            socket={props.socket}
          />
        );
      })}
    </div>
  );
}

export default GameRender;
