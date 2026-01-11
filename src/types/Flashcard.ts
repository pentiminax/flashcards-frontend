export interface Flashcard {
    id: string;
    question: string;
    answer: string;
    createdAt: number;
    updatedAt: number;
}

export type CreateFlashcardDTO = Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateFlashcardDTO = Partial<CreateFlashcardDTO>;
