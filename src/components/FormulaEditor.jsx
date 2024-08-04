import React from 'react';
import { useDrop, useDrag } from 'react-dnd';

const ItemTypes = {
  VARIABLE: 'variable',
  FORMULA_ITEM: 'formulaItem',
};

const FormulaEditor = ({ formula, setFormula }) => {
  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = formula[dragIndex];
    const updatedFormula = [...formula];
    updatedFormula.splice(dragIndex, 1);
    updatedFormula.splice(hoverIndex, 0, draggedItem);
    setFormula(updatedFormula);
  };

  const [, drop] = useDrop({
    accept: [ItemTypes.VARIABLE, ItemTypes.FORMULA_ITEM],
    drop: (item, monitor) => {
      if (monitor.getItemType() === ItemTypes.VARIABLE) {
        setFormula([...formula, item.name]);
      }
    },
  });

  return (
    <div ref={drop} className="formula-editor">
      {formula.map((item, index) => (
        <FormulaItem
          key={index}
          index={index}
          item={item}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
};

const FormulaItem = ({ item, index, moveItem }) => {
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

export default FormulaEditor;
