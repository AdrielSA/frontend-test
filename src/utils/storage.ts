import type { Card } from '../types';

const STORAGE_KEY = 'kanban-cards';
const LOAD_DELAY_MS = 1000;

export const simulateDelay = (ms: number = LOAD_DELAY_MS): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const loadCards = async (): Promise<Card[]> => {
  await simulateDelay();

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    return JSON.parse(data) as Card[];
  } catch (error) {
    console.error('Error loading cards from localStorage:', error);
    return [];
  }
};

export const saveCards = (cards: Card[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (error) {
    console.error('Error saving cards to localStorage:', error);
  }
};
