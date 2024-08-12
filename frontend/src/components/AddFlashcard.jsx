import axios from 'axios';
import React, { useState } from 'react';

const AddFlashcardForm = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();  
    console.log('Submitting form with:', { question, answer });  
    try {
      const response = await axios.post('/api/flashcards', { question, answer });
      console.log('Flashcard added:', response.data);
    } catch (error) {
      console.error('Error adding flashcard:', error.response || error.message || error);
      setError('Failed to add flashcard. Please try again.');
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Question:
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
    </label>
    <label>
      Answer:
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
    </label>
    <button type="submit">Add Flashcard</button>
    {error && <p>{error}</p>}
  </form>
  
  );
};

export default AddFlashcardForm;
