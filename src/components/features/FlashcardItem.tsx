import { useState } from 'react';
import type { Flashcard } from '../../types/Flashcard';
import styles from './FlashcardItem.module.css';

interface Props {
    flashcard: Flashcard;
    onDelete: (id: string) => void;
    onEdit: (flashcard: Flashcard) => void;
}

export function FlashcardItem({ flashcard, onDelete, onEdit }: Props) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure?')) {
            onDelete(flashcard.id);
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(flashcard);
    };

    return (
        <div className={styles.scene} onClick={handleFlip}>
            <div className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}>
                <div className={styles.face}>
                    {flashcard.question}
                    <div className={styles.actions}>
                        <button className={styles.actionBtn} onClick={handleEdit} title="Edit">✏️</button>
                        <button className={styles.actionBtn} onClick={handleDelete} title="Delete">🗑️</button>
                    </div>
                </div>
                <div className={`${styles.face} ${styles.back}`}>
                    {flashcard.answer}
                </div>
            </div>
        </div>
    );
}
