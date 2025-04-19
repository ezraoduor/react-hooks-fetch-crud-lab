import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(data => setQuestions(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(() => setQuestions(questions.filter(q => q.id !== id)));
  };

  const handleAnswerChange = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex })
    })
    .then(() => setQuestions(questions.map(q => 
      q.id === id ? {...q, correctIndex} : q
    )));
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem 
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;