import type { Flashcard, CreateFlashcardDTO, UpdateFlashcardDTO } from '../types/Flashcard';

export interface FlashcardService {
    getAll(): Promise<Flashcard[]>;
    getById(id: string): Promise<Flashcard | null>;
    create(data: CreateFlashcardDTO): Promise<Flashcard>;
    update(id: string, data: UpdateFlashcardDTO): Promise<Flashcard>;
    delete(id: string): Promise<void>;
}
