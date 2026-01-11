import type { Flashcard, CreateFlashcardDTO, UpdateFlashcardDTO } from '../types/Flashcard';
import type { FlashcardService } from './FlashcardService';

const STORAGE_KEY = 'flashcards_app_data';

const INITIAL_FIXTURES: Flashcard[] = [
    {
        id: '1',
        question: 'What is the capital of France?',
        answer: 'Paris',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    },
    {
        id: '2',
        question: 'What is the powerhouse of the cell?',
        answer: 'Mitochondria',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    },
    {
        id: '3',
        question: 'What does CSS stand for?',
        answer: 'Cascading Style Sheets',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    },
];

export class FixtureFlashcardService implements FlashcardService {
    private async getStorage(): Promise<Flashcard[]> {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FIXTURES));
            return INITIAL_FIXTURES;
        }
        return JSON.parse(data);
    }

    private async setStorage(data: Flashcard[]): Promise<void> {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    async getAll(): Promise<Flashcard[]> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.getStorage();
    }

    async getById(id: string): Promise<Flashcard | null> {
        const all = await this.getAll();
        return all.find(f => f.id === id) || null;
    }

    async create(data: CreateFlashcardDTO): Promise<Flashcard> {
        const all = await this.getAll();
        const newCard: Flashcard = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        await this.setStorage([newCard, ...all]);
        return newCard;
    }

    async update(id: string, data: UpdateFlashcardDTO): Promise<Flashcard> {
        const all = await this.getAll();
        const index = all.findIndex(f => f.id === id);
        if (index === -1) throw new Error('Flashcard not found');

        const updated = { ...all[index], ...data, updatedAt: Date.now() };
        all[index] = updated;
        await this.setStorage(all);
        return updated;
    }

    async delete(id: string): Promise<void> {
        const all = await this.getAll();
        const filtered = all.filter(f => f.id !== id);
        await this.setStorage(filtered);
    }
}
