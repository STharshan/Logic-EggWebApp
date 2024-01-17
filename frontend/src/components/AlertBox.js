import React, { useState } from 'react';
import "./AlertBox.css";


const AlertBox = ({title,descripton,button01,button02}) => {

  return (
    <div className='AlertBox'>
      <div className='mgbox'>
        <div className='row'>
          <span className='mgatx01'>{title}</span>
        </div>
        <div className='row'>
          <span className='mgatx02 mt-2'>{descripton}</span>
        </div>
        <div className='row mt-3'>
          <div className='col-12 all_end'>
            <div className='btnmg01'>{button01}</div>
            <div className='btnmg02'>{button02}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
