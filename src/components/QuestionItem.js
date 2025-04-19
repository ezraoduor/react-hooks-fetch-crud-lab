import React from "react";

function QuestionItem({ question, onDelete, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  // Fix 1: Corrected typo in "prompt" (was "prompt")
  // Fix 2: Added onChange handler for select
  // Fix 3: Added onClick handler for delete button
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
          defaultValue={correctIndex}
          onChange={(e) => onAnswerChange(id, parseInt(e.target.value))}
        >
          {options}
        </select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;