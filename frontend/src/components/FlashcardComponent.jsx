import React from 'react';

const FlashcardComponent = ({ data }) => {
  // Check if data and question are available
  if (!data || !data.question) {
    return <p>No data available</p>; // Handle missing data case
  }

  return (
    <div className="flashcard">
      <p><strong>Question:</strong> {data.question}</p>
      <p><strong>Answer:</strong> {data.answer}</p>
      {/* Add more JSX to display other properties or styles as needed */}
    </div>
  );
};

export default FlashcardComponent;
