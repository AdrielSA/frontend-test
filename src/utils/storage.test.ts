import { describe, it, expect, beforeEach, vi } from 'vitest';
import { simulateDelay, loadCards, saveCards } from './storage';
import type { Card } from '../types';

describe('storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('simulateDelay', () => {
    it('should delay for 1 second by default', async () => {
      const start = Date.now();
      await simulateDelay();
      const end = Date.now();
      const elapsed = end - start;
      expect(elapsed).toBeGreaterThanOrEqual(900);
    }, 3000);
  });

  describe('loadCards', () => {
    it('should return empty array when no cards in localStorage', async () => {
      vi.spyOn(global, 'setTimeout').mockImplementation((cb: any) => {
        cb();
        return 0 as any;
      });

      const cards = await loadCards();
      expect(cards).toEqual([]);

      vi.restoreAllMocks();
    });

    it('should load cards from localStorage', async () => {
      const mockCards: Card[] = [
        {
          id: '1',
          title: 'Prueba',
          description: 'Descripción',
          tag: 'SEO',
          assignee: 'Juan',
          dueDate: '2024-01-01',
          columnId: 'todo',
          order: 0,
        },
      ];

      localStorage.setItem('kanban-cards', JSON.stringify(mockCards));

      vi.spyOn(global, 'setTimeout').mockImplementation((cb: any) => {
        cb();
        return 0 as any;
      });

      const cards = await loadCards();
      expect(cards).toEqual(mockCards);

      vi.restoreAllMocks();
    });
  });

  describe('saveCards', () => {
    it('should save cards to localStorage', () => {
      const mockCards: Card[] = [
        {
          id: '1',
          title: 'Prueba',
          description: 'Descripción',
          tag: 'SEO',
          assignee: 'Juan',
          dueDate: '2024-01-01',
          columnId: 'todo',
          order: 0,
        },
      ];

      saveCards(mockCards);

      const stored = localStorage.getItem('kanban-cards');
      expect(stored).toBe(JSON.stringify(mockCards));
    });
  });
});
