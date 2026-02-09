import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Card, CardFormData, ColumnId } from '../types';
import { loadCards, saveCards } from '../utils/storage';

export function useCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeCards = async () => {
      const loadedCards = await loadCards();
      console.log('Tarjetas cargadas:', loadedCards.length);
      setCards(loadedCards);
      setLoading(false);
    };

    initializeCards();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveCards(cards);
      console.log('Tarjetas guardadas en localStorage');
    }
  }, [cards, loading]);

  const createCard = (formData: CardFormData) => {
    const todoCards = cards.filter((card) => card.columnId === 'todo');
    const maxOrder = todoCards.length > 0 ? Math.max(...todoCards.map((c) => c.order)) : -1;

    const newCard: Card = {
      id: uuidv4(),
      ...formData,
      columnId: 'todo',
      order: maxOrder + 1,
    };

    console.log('Creando nueva tarjeta:', newCard);
    setCards((prev) => [...prev, newCard]);
  };

  const updateCard = (id: string, formData: CardFormData) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...formData } : card))
    );
  };

  const deleteCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const moveCards = (cardIds: string[], targetColumnId: ColumnId) => {
    setCards((prev) => {
      const cardsToMove = prev.filter((card) => cardIds.includes(card.id));
      const otherCards = prev.filter((card) => !cardIds.includes(card.id));

      const targetColumnCards = otherCards.filter((card) => card.columnId === targetColumnId);
      const maxOrder =
        targetColumnCards.length > 0 ? Math.max(...targetColumnCards.map((c) => c.order)) : -1;

      const updatedMovedCards = cardsToMove.map((card, index) => ({
        ...card,
        columnId: targetColumnId,
        order: maxOrder + 1 + index,
      }));

      return [...otherCards, ...updatedMovedCards];
    });
  };

  const getCardsByColumn = (columnId: ColumnId): Card[] => {
    return cards
      .filter((card) => card.columnId === columnId)
      .sort((a, b) => a.order - b.order);
  };

  return {
    cards,
    loading,
    createCard,
    updateCard,
    deleteCard,
    moveCards,
    getCardsByColumn,
  };
}
