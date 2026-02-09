import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import type { Card as CardType } from '../../types';
import { DndContext } from '@dnd-kit/core';

const mockCard: CardType = {
  id: '1',
  title: 'Tarjeta de Prueba',
  description: 'Descripción de Prueba',
  tag: 'SEO',
  assignee: 'Juan Pérez',
  dueDate: '2024-06-01',
  columnId: 'todo',
  order: 0,
};

describe('Card', () => {
  it('should render card with information', () => {
    render(
      <DndContext>
        <Card
          card={mockCard}
          isSelected={false}
          onSelect={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      </DndContext>
    );

    expect(screen.getByText('Tarjeta de Prueba')).toBeInTheDocument();
    expect(screen.getByText('Descripción de Prueba')).toBeInTheDocument();
    expect(screen.getByText('SEO')).toBeInTheDocument();
  });

  it('should render action buttons', () => {
    render(
      <DndContext>
        <Card
          card={mockCard}
          isSelected={false}
          onSelect={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      </DndContext>
    );

    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Eliminar')).toBeInTheDocument();
  });
});
