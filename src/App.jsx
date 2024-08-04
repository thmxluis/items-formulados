import React, { useState } from 'react';
import VariableList from './components/VariableList';
import FormulaEditor from './components/FormulaEditor';
import OperatorButtons from './components/OperatorButtons';
import CustomValueInput from './components/CustomValueInput';
import DeleteButton from './components/DeleteButton';
import ResultOutput from './components/ResultOutput';
import IfConditionEditor from './components/IfConditionEditor';
import './styles.css';

const App = () => {
  const [formula, setFormula] = useState([]);

  const handleVariableSelect = (variable) => {
    setFormula([...formula, variable]);
  };

  const handleOperatorSelect = (operator) => {
    setFormula([...formula, operator]);
  };

  const handleCustomValueAdd = (value) => {
    setFormula([...formula, value]);
  };

  const handleDelete = (index) => {
    const newFormula = formula.filter((_, i) => i !== index);
    setFormula(newFormula);
  };

  const addConditionToFormula = (condition) => {
    const ifPart = condition.if.join(' ');
    const thenPart = condition.then.join(' ');
    const elsePart = condition.else.join(' ');

    const conditionString = `(${ifPart}) if ${thenPart} else ${elsePart}`;
    setFormula([...formula, conditionString]);
  };

  return (
    <div className="app">
      <h1>Formula Builder</h1>
      <div className="panel">
        <VariableList onVariableSelect={handleVariableSelect} />
        <OperatorButtons onOperatorSelect={handleOperatorSelect} />
        <CustomValueInput onCustomValueAdd={handleCustomValueAdd} />
        <IfConditionEditor addConditionToFormula={addConditionToFormula} />
      </div>
      <FormulaEditor formula={formula} setFormula={setFormula} />
      <DeleteButton onDelete={handleDelete} />
      <ResultOutput formula={formula} />
    </div>
  );
};

export default App;
