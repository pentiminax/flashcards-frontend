import type { Flashcard } from '../../types/Flashcard';
import { FlashcardItem } from './FlashcardItem';

interface Props {
    flashcards: Flashcard[];
    onDelete: (id: string) => void;
    onEdit: (flashcard: Flashcard) => void;
}

export function FlashcardList({ flashcards, onDelete, onEdit }: Props) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            padding: '2rem 0'
        }}>
            {flashcards.map(flashcard => (
                <FlashcardItem
                    key={flashcard.id}
                    flashcard={flashcard}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}
