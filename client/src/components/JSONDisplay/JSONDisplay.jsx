import React from 'react';
import './JSONDisplay.css';

const JSONDisplay = ({ jsonData }) => {

  return (

    <div className="JSONContainer">
      <pre className="JSONText">{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default JSONDisplay;
