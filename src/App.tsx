import { useState } from 'react';
import { useFlashcards } from './hooks/useFlashcards';
import { FlashcardList } from './components/features/FlashcardList';
import { FlashcardForm } from './components/features/FlashcardForm';
import { Modal } from './components/ui/Modal';
import type { Flashcard, CreateFlashcardDTO } from './types/Flashcard';

function App() {
  const { flashcards, loading, error, addFlashcard, updateFlashcard, deleteFlashcard } = useFlashcards();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | undefined>(undefined);

  const handleCreate = () => {
    setEditingCard(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (card: Flashcard) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: CreateFlashcardDTO) => {
    if (editingCard) {
      await updateFlashcard(editingCard.id, data);
    } else {
      await addFlashcard(data);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem 0',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Flashcards
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Master your knowledge</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate} style={{ boxShadow: 'var(--shadow-md)' }}>
          + New Card
        </button>
      </header>

      {error && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#dc2626', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
          Loading your cards...
        </div>
      ) : flashcards.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)' }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No flashcards yet!</p>
          <button className="btn btn-primary" onClick={handleCreate}>Create your first card</button>
        </div>
      ) : (
        <FlashcardList
          flashcards={flashcards}
          onDelete={deleteFlashcard}
          onEdit={handleEdit}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCard ? 'Edit Flashcard' : 'Create Flashcard'}
      >
        <FlashcardForm
          initialData={editingCard}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;
