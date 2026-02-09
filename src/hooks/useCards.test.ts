import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCards } from './useCards';
import * as storage from '../utils/storage';

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'test-id'),
}));

describe('useCards', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.spyOn(storage, 'simulateDelay').mockResolvedValue();
    vi.spyOn(storage, 'loadCards').mockResolvedValue([]);
  });

  it('should load cards on mount', async () => {
    const { result } = renderHook(() => useCards());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(storage.loadCards).toHaveBeenCalled();
  });

  it('should create a new card', async () => {
    const { result } = renderHook(() => useCards());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.createCard({
        title: 'Prueba',
        description: 'Descripción de prueba',
        tag: 'SEO',
        assignee: 'Juan',
        dueDate: '2024-01-01',
      });
    });

    expect(result.current.cards).toHaveLength(1);
    expect(result.current.cards[0].title).toBe('Prueba');
  });

  it('should delete a card', async () => {
    vi.spyOn(storage, 'loadCards').mockResolvedValue([
      {
        id: '1',
        title: 'Tarjeta 1',
        description: 'Descripción',
        tag: 'SEO',
        assignee: 'Juan',
        dueDate: '2024-01-01',
        columnId: 'todo',
        order: 0,
      },
    ]);

    const { result } = renderHook(() => useCards());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.deleteCard('1');
    });

    expect(result.current.cards).toHaveLength(0);
  });
});
