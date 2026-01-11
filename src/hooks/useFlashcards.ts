import { useState, useEffect } from 'react';
import type { Flashcard, CreateFlashcardDTO, UpdateFlashcardDTO } from '../types/Flashcard';
import { FixtureFlashcardService } from '../services/FixtureFlashcardService';
import { ApiFlashcardService } from '../services/ApiFlashcardService';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

const service = useMock ? new FixtureFlashcardService() : new ApiFlashcardService();

export function useFlashcards() {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadFlashcards();
    }, []);

    const loadFlashcards = async () => {
        try {
            setLoading(true);
            const data = await service.getAll();
            setFlashcards(data);
        } catch (err) {
            setError('Failed to load flashcards');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addFlashcard = async (data: CreateFlashcardDTO) => {
        try {
            const newCard = await service.create(data);
            setFlashcards(prev => [newCard, ...prev]);
            return newCard;
        } catch (err) {
            setError('Failed to add flashcard');
            throw err;
        }
    };

    const updateFlashcard = async (id: string, data: UpdateFlashcardDTO) => {
        try {
            const updated = await service.update(id, data);
            setFlashcards(prev => prev.map(c => c.id === id ? updated : c));
            return updated;
        } catch (err) {
            setError('Failed to update flashcard');
            throw err;
        }
    };

    const deleteFlashcard = async (id: string) => {
        try {
            await service.delete(id);
            setFlashcards(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            setError('Failed to delete flashcard');
            throw err;
        }
    };

    return {
        flashcards,
        loading,
        error,
        addFlashcard,
        updateFlashcard,
        deleteFlashcard,
        refresh: loadFlashcards
    };
}
