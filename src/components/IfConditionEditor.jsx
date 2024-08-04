import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';

const ItemTypes = {
  VARIABLE: 'variable',
  OPERATOR: 'operator',
  CUSTOM_VALUE: 'customValue',
  FORMULA_ITEM: 'formulaItem',
};

const IfConditionEditor = ({ addConditionToFormula }) => {
  const [condition, setCondition] = useState({
    if: [],
    then: [],
    else: [],
  });

  const handleDrop = (section, item) => {
    setCondition((prevCondition) => ({
      ...prevCondition,
      [section]: [...prevCondition[section], item.name],
    }));
  };

  const moveItem = (section, dragIndex, hoverIndex) => {
    const items = condition[section];
    const draggedItem = items[dragIndex];
    const updatedItems = [...items];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setCondition((prevCondition) => ({
      ...prevCondition,
      [section]: updatedItems,
    }));
  };

  const handleReset = () => {
    setCondition({
      if: [],
      then: [],
      else: [],
    });
  };

  return (
    <div className="if-condition-editor">
      <h4>If Condition</h4>
      <div className="if-section">
        <span>IF</span>
        <DropArea
          items={condition.if}
          onDrop={(item) => handleDrop('if', item)}
          moveItem={(dragIndex, hoverIndex) => moveItem('if', dragIndex, hoverIndex)}
        />
      </div>
      <div className="then-section">
        <span>THEN</span>
        <DropArea
          items={condition.then}
          onDrop={(item) => handleDrop('then', item)}
          moveItem={(dragIndex, hoverIndex) => moveItem('then', dragIndex, hoverIndex)}
        />
      </div>
      <div className="else-section">
        <span>ELSE</span>
        <DropArea
          items={condition.else}
          onDrop={(item) => handleDrop('else', item)}
          moveItem={(dragIndex, hoverIndex) => moveItem('else', dragIndex, hoverIndex)}
        />
      </div>
      <div className="buttons">
        <button onClick={() => addConditionToFormula(condition)}>Add</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

const DropArea = ({ items, onDrop, moveItem }) => {
  const [, drop] = useDrop({
    accept: [ItemTypes.VARIABLE, ItemTypes.OPERATOR, ItemTypes.CUSTOM_VALUE],
    drop: (item) => onDrop(item),
  });

  return (
    <div ref={drop} className="drop-area">
      {items.map((item, index) => (
        <DropItem key={index} index={index} item={item} moveItem={moveItem} />
      ))}
    </div>
  );
};

const DropItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemTypes.FORMULA_ITEM,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.FORMULA_ITEM,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <span ref={(node) => ref(drop(node))} className="formula-item">
      {item}
    </span>
  );
};

export default IfConditionEditor;
