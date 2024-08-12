import { useState, useEffect } from 'react';
import FlashcardList from './components/FlashcardList';
import AddFlashcard from './components/AddFlashcard';

function App() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/api/flashcards'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    fetchData();
  }, []); 

  const addFlashcard = (question, answer) => {
    setFlashcards([...flashcards, { question, answer }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flashcard Learning Tool</h1>
      <AddFlashcard addFlashcard={addFlashcard} />
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

export default App;
