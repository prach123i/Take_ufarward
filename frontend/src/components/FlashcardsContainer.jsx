import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlashcardList from './FlashcardList';

const FlashcardsContainer = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/flashcards')
            .then(response => {
                console.log('Raw data from server:', response.data);  
                const data = response.data;

                const validFlashcards = data.filter(flashcard => flashcard && flashcard.question);
                console.log('Valid flashcards:', validFlashcards);  

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
