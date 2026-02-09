import { describe, it, expect } from 'vitest';
import { filterCards } from './filters';
import type { Card } from '../types';

const mockCards: Card[] = [
  {
    id: '1',
    title: 'Optimización SEO',
    description: 'Mejorar SEO',
    tag: 'SEO',
    assignee: 'Juan',
    dueDate: '2024-01-01',
    columnId: 'todo',
    order: 0,
  },
  {
    id: '2',
    title: 'Artículo de Blog',
    description: 'Escribir artículo',
    tag: 'Artículo de Blog',
    assignee: 'Ana',
    dueDate: '2024-01-02',
    columnId: 'todo',
    order: 1,
  },
];

describe('filterCards', () => {
  it('should return all cards when query is empty', () => {
    const result = filterCards(mockCards, '');
    expect(result).toHaveLength(2);
  });

  it('should filter by title', () => {
    const result = filterCards(mockCards, 'SEO');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Optimización SEO');
  });

  it('should filter by assignee', () => {
    const result = filterCards(mockCards, 'Ana');
    expect(result).toHaveLength(1);
    expect(result[0].assignee).toBe('Ana');
  });
});
