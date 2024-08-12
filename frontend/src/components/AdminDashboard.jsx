import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch flashcards from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(response => {
        setFlashcards(response.data);
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
      });
  }, []);

  // Add a new flashcard
  const addFlashcard = () => {
    if (!question || !answer) {
      alert('Question and answer are required.');
      return;
    }
    axios.post('http://localhost:5000/api/flashcards', { question, answer })
      .then(response => {
        setFlashcards([...flashcards, response.data]);
        setQuestion('');
        setAnswer('');
      })
      .catch(error => {
        console.error('Error adding flashcard:', error);
      });
  };

  // Edit an existing flashcard
  const editFlashcard = id => {
    setEditingId(id);
    const card = flashcards.find(card => card.id === id);
    if (card) {
      setQuestion(card.question);
      setAnswer(card.answer);
    }
  };

  // Update an existing flashcard
  const updateFlashcard = () => {
    if (!question || !answer) {
      alert('Question and answer are required.');
      return;
    }
    axios.put(`http://localhost:5000/api/flashcards/${editingId}`, { question, answer })
      .then(response => {
        setFlashcards(flashcards.map(card => card.id === editingId ? response.data : card));
        setQuestion('');
        setAnswer('');
        setEditingId(null);
      })
      .catch(error => {
        console.error('Error updating flashcard:', error);
      });
  };

  // Delete a flashcard
  const deleteFlashcard = id => {
    axios.delete(`http://localhost:5000/api/flashcards/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter(card => card.id !== id));
      })
      .catch(error => {
        console.error('Error deleting flashcard:', error);
      });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        {editingId ? (
          <button onClick={updateFlashcard}>Update Flashcard</button>
        ) : (
          <button onClick={addFlashcard}>Add Flashcard</button>
        )}
      </div>

      <ul>
        {flashcards.map(card => (
          <li key={card.id}>
            <strong>Q:</strong> {card.question} <br />
            <strong>A:</strong> {card.answer}
            <button onClick={() => editFlashcard(card.id)}>Edit</button>
            <button onClick={() => deleteFlashcard(card.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
