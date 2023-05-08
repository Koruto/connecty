import Row from './Row';

function GameRender(props) {
  // props.board.forEach((value) => <Cell columns={value} />);

  return (
    <div>
      {props.board.map((boardRow, rowIndex) => {
        return (
          <Row
            key={rowIndex}
            boardRow={boardRow}
            dispatch={props.dispatch}
            win={props.win}
          />
        );
      })}
    </div>
  );
}

export default GameRender;
