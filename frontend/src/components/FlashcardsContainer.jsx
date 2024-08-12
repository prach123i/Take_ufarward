import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlashcardList from './FlashcardList';

const FlashcardsContainer = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch flashcards data from the API
        axios.get('/api/flashcards')
            .then(response => {
                console.log('Raw data from server:', response.data);  // Debugging line
                const data = response.data;

                // Validate the data
                const validFlashcards = data.filter(flashcard => flashcard && flashcard.question);
                console.log('Valid flashcards:', validFlashcards);  // Debugging line

                // Update state with validated flashcards
                setFlashcards(validFlashcards);
            })
            .catch(error => {
                console.error('Error fetching flashcards:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading flashcards...</p>;
    }

    return (
        <div>
            {flashcards.length > 0 ? (
                <FlashcardList flashcards={flashcards} />
            ) : (
                <p>No flashcards available.</p>
            )}
        </div>
    );
};

export default FlashcardsContainer;
