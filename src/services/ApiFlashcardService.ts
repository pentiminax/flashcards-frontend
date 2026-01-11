import type { Flashcard, CreateFlashcardDTO, UpdateFlashcardDTO } from '../types/Flashcard';
import type { FlashcardService } from './FlashcardService';

// Backend types
interface BackendFlashcard {
    id: number;
    question: string;
    answer: string;
    createdAt: string;
    updatedAt: string | null;
}

export class ApiFlashcardService implements FlashcardService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_SERVER_NAME + '/api/flashcards';
    }

    private mapToDomain(backendCard: BackendFlashcard): Flashcard {
        return {
            id: backendCard.id.toString(),
            question: backendCard.question,
            answer: backendCard.answer,
            createdAt: new Date(backendCard.createdAt).getTime(),
            updatedAt: backendCard.updatedAt ? new Date(backendCard.updatedAt).getTime() : Date.now(),
        };
    }

    async getAll(): Promise<Flashcard[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        const data: BackendFlashcard[] = await response.json();
        return data.map(this.mapToDomain);
    }

    async getById(id: string): Promise<Flashcard | null> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        const data: BackendFlashcard = await response.json();
        return this.mapToDomain(data);
    }

    async create(data: CreateFlashcardDTO): Promise<Flashcard> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        const backendCard: BackendFlashcard = await response.json();
        return this.mapToDomain(backendCard);
    }

    async update(id: string, data: UpdateFlashcardDTO): Promise<Flashcard> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT', // or PATCH depending on backend
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        const backendCard: BackendFlashcard = await response.json();
        return this.mapToDomain(backendCard);
    }

    async delete(id: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    }
}
