import React, { useState, useEffect } from "react";

function QuestionForm({ onAddQuestion = () => {} }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    return () => {
      isMounted = false; // Cleanup: set the flag to false when the component unmounts
    };
  }, []); // Empty dependency array ensures this effect runs only on mount/unmount

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    try {
      const questionData = {
        prompt: formData.prompt,
        answers: [
          formData.answer1,
          formData.answer2,
          formData.answer3,
          formData.answer4,
        ].filter(answer => answer.trim() !== ""),
        correctIndex: parseInt(formData.correctIndex),
      };

      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      const newQuestion = await response.json();
      
      // Only call onAddQuestion if the component is still mounted
      if (isMounted && typeof onAddQuestion === 'function') {
        onAddQuestion(newQuestion);
      }

      // Reset the form only if the component is still mounted
      if (isMounted) {
        setFormData({
          prompt: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          correctIndex: 0,
        });
      }

    } catch (error) {
      console.error("Error adding question:", error);
    }
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">Answer 1</option>
            <option value="1">Answer 2</option>
            <option value="2">Answer 3</option>
            <option value="3">Answer 4</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
