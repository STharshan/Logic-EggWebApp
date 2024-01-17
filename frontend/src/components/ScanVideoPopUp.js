import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import "./ScanVideoPopUp.css";


const ScanVideoPopUp = ({ id }) => {

  return (
    <div className='AlertBox'>
      <div className='mgbox'>
        <div className='row'>
          <div className='col-12 all_spacevideo'>
            <span className='iconvideotx'>Scan: <span className='iconvideotx2'>{id}</span></span>
            <IoCloseSharp className='iconvideo' />
          </div>
        </div>
        <div className='row'>
          <video className='' width="600" height="400" controls>
            <source className='' src="./images/sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default ScanVideoPopUp;
