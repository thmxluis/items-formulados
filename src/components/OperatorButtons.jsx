import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  OPERATOR: 'operator',
};

const operators = ['+', '-', '*', '/', 'AND', 'OR', 'NOT', '(', ')', '>', '>=', '<', '<='];

const OperatorButtons = ({ onOperatorSelect }) => {
  return (
    <div className="operator-buttons">
      {operators.map((operator, index) => (
        <OperatorButton key={index} operator={operator} onOperatorSelect={onOperatorSelect} />
      ))}
    </div>
  );
};

const OperatorButton = ({ operator, onOperatorSelect }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.OPERATOR,
    item: { name: operator },
  }));

  return (
    <button
      ref={drag}
      onClick={() => onOperatorSelect(operator)}
      className="operator-button"
    >
      {operator}
    </button>
  );
};

export default OperatorButtons;
