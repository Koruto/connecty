function Row(props) {
  const row = props.boardRow;
  function computeStyle(arrayValue) {
    if (arrayValue === null) return '';
    if (arrayValue[0] == 9)
      return arrayValue[2] == 'o' ? 'bg-blue-500' : 'bg-green-500';
    return arrayValue == 'one' ? 'bg-blue-600' : 'bg-green-600';
  }

  /*
    onClick function
    In this upon click I call the setGame function passed down from the App.jsx file which changes or calls the things in 
    main 'game' object. 
    Upon Calling it I pass the column to addTile function.
  */

  return (
    <div
      className="flex flex-col my-[10px] bg-[#a4a6a7] hover:bg-sky-700"
      onClick={() => {
        const roomName = window.location.pathname.substring(6);
        props.socket.emit('add_tile', props.index, roomName);
        // console.log('Clicked Once');
        // props.dispatch({
        //   type: ACTION_TYPE.ADD_TILE,
        //   payload: props.index,
        // });
      }}
    >
      {row.map((boardCell, columnIndex) => {
        return (
          <div
            key={columnIndex}
            className="h-[90px] bg-white m-[10px] w-[90px]"
          >
            <div
              className={
                (props.win && boardCell && boardCell[0] != 9
                  ? 'opacity-50'
                  : '') +
                ' h-full rounded-[35%]' +
                ' ' +
                computeStyle(boardCell)
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default Row;
