import React from 'react';
import './JSONDisplay.css';

const JSONDisplay = ({ jsonData }) => {
  const filteredData = {
    identification_number: jsonData.identificationNumber,
    name: jsonData.firstName,
    last_name: jsonData.lastName,
    'date-of-birth': jsonData.dateOfBirth,
    'date-of-issue': jsonData.dateOfIssue,
    'date-of-expiry': jsonData.dateOfExpiry
  };

  return (
    <div className="JSONContainer">
      <pre className="JSONText">{JSON.stringify(filteredData, null, 2)}</pre>
    </div>
  );
};

export default JSONDisplay;
