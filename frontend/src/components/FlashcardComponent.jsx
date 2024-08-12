import React from 'react';

const FlashcardComponent = ({ data }) => {
  if (!data || !data.question) {
    return <p>No data available</p>; 
  }

  return (
    <div className="flashcard">
      <p><strong>Question:</strong> {data.question}</p>
      <p><strong>Answer:</strong> {data.answer}</p>
    </div>
  );
};

export default FlashcardComponent;
