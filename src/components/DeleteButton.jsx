import React from 'react';
import { useDrop } from 'react-dnd';

const DeleteButton = ({ onDelete }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'formulaItem',
    drop: (item) => onDelete(item.index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`delete-button ${isOver ? 'hover' : ''}`}>
      🗑️
    </div>
  );
};

export default DeleteButton;
