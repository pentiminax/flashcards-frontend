import { useState, useEffect } from 'react';
import type { CreateFlashcardDTO, Flashcard } from '../../types/Flashcard';

interface Props {
    initialData?: Flashcard;
    onSubmit: (data: CreateFlashcardDTO) => void;
    onCancel: () => void;
}

export function FlashcardForm({ initialData, onSubmit, onCancel }: Props) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        if (initialData) {
            setQuestion(initialData.question);
            setAnswer(initialData.answer);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ question, answer });
        setQuestion('');
        setAnswer('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Question</label>
                <input
                    className="input"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder="e.g. What is React?"
                    required
                />
            </div>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Answer</label>
                <textarea
                    className="input"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    placeholder="The answer..."
                    required
                    rows={4}
                    style={{ resize: 'vertical' }}
                />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    {initialData ? 'Update Card' : 'Add Card'}
                </button>
            </div>
        </form>
    );
}
