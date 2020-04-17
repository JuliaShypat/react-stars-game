import React from 'react';

const PlayNumber = (props) => {
  return (
    <button
      className='number'
      style={{ backgroundColor: colors[props.status] }}
      onClick={() => props.onClick(props.value, props.status)}
    >
      {props.value}
    </button>
  );
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

export default PlayNumber;
