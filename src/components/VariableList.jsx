import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  VARIABLE: 'variable',
};

const variables = ['variable1', 'variable2', 'variable3']; // Ejemplo de variables

const VariableList = ({ onVariableSelect }) => {
  return (
    <div className="variable-list">
      {variables.map((variable, index) => (
        <VariableItem key={index} name={variable} onVariableSelect={onVariableSelect} />
      ))}
    </div>
  );
};

const VariableItem = ({ name, onVariableSelect }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.VARIABLE,
    item: { name },
  }));

  return (
    <div
      ref={drag}
      className="variable-item"
      onClick={() => onVariableSelect(name)}
    >
      {name}
    </div>
  );
};

export default VariableList;
