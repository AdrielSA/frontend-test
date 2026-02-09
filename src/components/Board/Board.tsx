import styled from '@emotion/styled';
import { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import type { Card as CardType, ColumnId } from '../../types';
import { Column } from '../Column/Column';
import { SearchBar } from '../SearchBar/SearchBar';
import { CardModal } from '../CardModal/CardModal';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { Card } from '../Card/Card';
import { useCards } from '../../hooks/useCards';
import { filterCards } from '../../utils/filters';

const BoardWrapper = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: #ffffff;
`;

const BoardHeader = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 24px 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
`;

const AddButton = styled.button`
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #2563eb;
  }
`;

const ColumnsContainer = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const columns: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'Por Hacer' },
  { id: 'inProgress', title: 'En Progreso' },
  { id: 'done', title: 'Completado' },
];

export function Board() {
  const { cards, loading, createCard, updateCard, deleteCard, moveCards, getCardsByColumn } =
    useCards();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cardModalMode, setCardModalMode] = useState<'create' | 'edit'>('create');
  const [editingCard, setEditingCard] = useState<CardType | undefined>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);

  const filteredCards = filterCards(cards, searchQuery);

  const getFilteredCardsByColumn = (columnId: ColumnId) => {
    const columnCards = getCardsByColumn(columnId);
    return columnCards.filter((card) => filteredCards.some((fc) => fc.id === card.id));
  };

  const handleSelectCard = (id: string, multiSelect: boolean) => {
    if (multiSelect) {
      setSelectedCardIds((prev) =>
        prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
      );
    } else {
      setSelectedCardIds([id]);
    }
  };

  const handleAddCard = () => {
    setCardModalMode('create');
    setEditingCard(undefined);
    setIsCardModalOpen(true);
  };

  const handleEditCard = (card: CardType) => {
    setCardModalMode('edit');
    setEditingCard(card);
    setIsCardModalOpen(true);
  };

  const handleDeleteCard = (id: string) => {
    setDeletingCardId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingCardId) {
      deleteCard(deletingCardId);
      setIsDeleteModalOpen(false);
      setDeletingCardId(null);
    }
  };

  const handleCardModalSubmit = (data: CardFormData) => {
    console.log('Guardando tarjeta:', data);
    if (cardModalMode === 'create') {
      createCard(data);
    } else if (editingCard) {
      updateCard(editingCard.id, data);
    }
    setIsCardModalOpen(false);
    setEditingCard(undefined);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    if (!selectedCardIds.includes(active.id as string)) {
      setSelectedCardIds([active.id as string]);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) {
      return;
    }

    const targetColumnId = over.id as ColumnId;

    if (!columns.some((col) => col.id === targetColumnId)) {
      return;
    }

    const cardsToMove = selectedCardIds.length > 0 ? selectedCardIds : [active.id as string];

    moveCards(cardsToMove, targetColumnId);

    setSelectedCardIds([]);
  };

  const activeCard = activeId ? cards.find((card) => card.id === activeId) : null;

  return (
    <BoardWrapper>
      <BoardHeader>
        <Title>Kanban Board</Title>
        <HeaderActions>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <AddButton onClick={handleAddCard}>+ Agregar Tarjeta</AddButton>
        </HeaderActions>
      </BoardHeader>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <ColumnsContainer>
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cards={getFilteredCardsByColumn(column.id)}
              selectedCardIds={selectedCardIds}
              loading={loading}
              onSelectCard={handleSelectCard}
              onEditCard={handleEditCard}
              onDeleteCard={handleDeleteCard}
            />
          ))}
        </ColumnsContainer>

        <DragOverlay>
          {activeCard ? (
            <Card
              card={activeCard}
              isSelected={false}
              onSelect={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <CardModal
        isOpen={isCardModalOpen}
        mode={cardModalMode}
        card={editingCard}
        onClose={() => {
          setIsCardModalOpen(false);
          setEditingCard(undefined);
        }}
        onSubmit={handleCardModalSubmit}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Eliminar Tarjeta"
        message="¿Estás seguro de que deseas eliminar esta tarjeta? Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeletingCardId(null);
        }}
      />
    </BoardWrapper>
  );
}
