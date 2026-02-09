import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Column } from './Column';
import { DndContext } from '@dnd-kit/core';

describe('Column', () => {
  it('should render column with title', () => {
    render(
      <DndContext>
        <Column
          id="todo"
          title="Por Hacer"
          cards={[]}
          selectedCardIds={[]}
          onSelectCard={vi.fn()}
          onEditCard={vi.fn()}
          onDeleteCard={vi.fn()}
        />
      </DndContext>
    );

    expect(screen.getByText('Por Hacer')).toBeInTheDocument();
  });

  it('should show empty state when no cards', () => {
    render(
      <DndContext>
        <Column
          id="todo"
          title="Por Hacer"
          cards={[]}
          selectedCardIds={[]}
          onSelectCard={vi.fn()}
          onEditCard={vi.fn()}
          onDeleteCard={vi.fn()}
        />
      </DndContext>
    );

    expect(screen.getByText('Aún no hay tarjetas')).toBeInTheDocument();
  });

  it('should show skeletons when loading', () => {
    render(
      <DndContext>
        <Column
          id="todo"
          title="Por Hacer"
          cards={[]}
          selectedCardIds={[]}
          loading={true}
          onSelectCard={vi.fn()}
          onEditCard={vi.fn()}
          onDeleteCard={vi.fn()}
        />
      </DndContext>
    );

    expect(screen.queryByText('Aún no hay tarjetas')).not.toBeInTheDocument();
  });
});
