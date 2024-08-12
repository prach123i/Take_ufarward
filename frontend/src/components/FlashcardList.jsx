import React from 'react';
import FlashcardComponent from './FlashcardComponent';

const FlashcardList = ({ flashcards }) => {
  return (
    <div>
      {flashcards.map(flashcard => (
        <FlashcardComponent key={flashcard.idflashcards} data={flashcard} />
      ))}
    </div>
  );
};

export default FlashcardList;
