import React from 'react';
import './nodata.css';
import { GoDatabase } from "react-icons/go";

const NoData = () => {
  return (
    <div className="terminal-loader">
      <div className="terminal-header">
        <div className="terminal-title">Status</div>
        <div className="terminal-controls">
           <GoDatabase size={20}/>
          {/* <div className="control close" />
          <div className="control minimize" />
          <div className="control maximize" /> */}
        </div>
      </div>
      <div className="text">No Data in our DATABASE...</div>
    </div>
  );
};

export default NoData;
