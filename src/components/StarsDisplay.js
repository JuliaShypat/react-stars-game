import React from 'react';
import utils from '../math-utils';

const StarsDisplay = (props) => (
  <>
    {utils.range(1, props.stars).map((star) => (
      <div key={star} className='star' />
    ))}
  </>
);

export default StarsDisplay;
