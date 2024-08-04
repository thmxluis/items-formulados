import React from 'react';

const operators = ['+', '-', '*', '/', 'AND', 'OR', 'NOT', '(', ')'];

const OperatorButtons = ({ onOperatorSelect }) => {
  return (
    <div className="operator-buttons">
      {operators.map((operator, index) => (
        <button
          key={index}
          onClick={() => onOperatorSelect(operator)}
          className="operator-button"
        >
          {operator}
        </button>
      ))}
    </div>
  );
};

export default OperatorButtons;
