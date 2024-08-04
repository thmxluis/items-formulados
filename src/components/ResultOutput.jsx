import React from 'react';

const ResultOutput = ({ formula }) => {
  const generatePythonCode = (formula) => {
    // Implementar la lógica para convertir la fórmula a código Python
    return formula.join(' ');
  };

  return (
    <div className="result-output">
      <h3>Resultado en Python:</h3>
      <pre>{generatePythonCode(formula)}</pre>
    </div>
  );
};

export default ResultOutput;
