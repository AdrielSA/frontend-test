import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardModal } from './CardModal';

describe('CardModal', () => {
  it('should render create modal', () => {
    render(
      <CardModal
        isOpen={true}
        mode="create"
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByText('Crear Nueva Tarjeta')).toBeInTheDocument();
    expect(screen.getByLabelText(/Título/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/)).toBeInTheDocument();
  });

  it('should render edit modal with data', () => {
    const card = {
      id: '1',
      title: 'Tarjeta de Prueba',
      description: 'Descripción de Prueba',
      tag: 'SEO' as const,
      assignee: 'Juan',
      dueDate: '2024-01-01',
      columnId: 'todo' as const,
      order: 0,
    };

    render(
      <CardModal
        isOpen={true}
        mode="edit"
        card={card}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByText('Editar Tarjeta')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Tarjeta de Prueba')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(
      <CardModal
        isOpen={false}
        mode="create"
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.queryByText('Crear Nueva Tarjeta')).not.toBeInTheDocument();
  });
});
