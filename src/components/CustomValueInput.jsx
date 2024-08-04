import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  CUSTOM_VALUE: 'customValue',
};

const CustomValueInput = ({ onCustomValueAdd }) => {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (value) {
      onCustomValueAdd(value);
      setValue('');
    }
  };

  return (
    <div className="custom-value-input">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter value"
      />
      <button onClick={handleAdd} className="add-button">Add Value</button>
      {value && <DraggableCustomValue value={value} />}
    </div>
  );
};

const DraggableCustomValue = ({ value }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CUSTOM_VALUE,
    item: { name: value },
  }), [value]);

  return (
    <div ref={drag} className="draggable-custom-value">
      {value}
    </div>
  );
};

export default CustomValueInput;
