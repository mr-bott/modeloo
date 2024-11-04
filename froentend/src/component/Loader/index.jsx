import React from 'react';
import './loader.css'; // Import the CSS file

const Loader = () => {
  return (
    <div className="loadingspinner">
      <div id="square1" />
      <div id="square2" />
      <div id="square3" />
      <div id="square4" />
      <div id="square5" />
    </div>
  );
}

export default Loader;
