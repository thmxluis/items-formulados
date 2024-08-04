import React, { useState } from 'react';

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
    </div>
  );
};

export default CustomValueInput;
