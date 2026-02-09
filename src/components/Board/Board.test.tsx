import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Board } from './Board';
import * as storage from '../../utils/storage';

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid'),
}));

describe('Board', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.spyOn(storage, 'simulateDelay').mockResolvedValue();
    vi.spyOn(storage, 'loadCards').mockResolvedValue([]);
  });

  it('should render board with columns', async () => {
    render(<Board />);

    await waitFor(() => {
      expect(screen.getByText('Kanban Board')).toBeInTheDocument();
    });

    expect(screen.getByText('Por Hacer')).toBeInTheDocument();
    expect(screen.getByText('En Progreso')).toBeInTheDocument();
    expect(screen.getByText('Completado')).toBeInTheDocument();
  });

  it('should open create modal when clicking add button', async () => {
    const user = userEvent.setup();
    render(<Board />);

    await waitFor(() => {
      expect(screen.getByText('+ Agregar Tarjeta')).toBeInTheDocument();
    });

    await user.click(screen.getByText('+ Agregar Tarjeta'));

    await waitFor(() => {
      expect(screen.getByText('Crear Nueva Tarjeta')).toBeInTheDocument();
    });
  });

  it('should display loaded cards', async () => {
    vi.spyOn(storage, 'loadCards').mockResolvedValue([
      {
        id: '1',
        title: 'Tarjeta de Prueba',
        description: 'Descripción de Prueba',
        tag: 'SEO',
        assignee: 'Juan',
        dueDate: '2024-01-01',
        columnId: 'todo',
        order: 0,
      },
    ]);

    render(<Board />);

    await waitFor(() => {
      expect(screen.getByText('Tarjeta de Prueba')).toBeInTheDocument();
    });
  });

  it('should show empty state when no cards', async () => {
    render(<Board />);

    await waitFor(() => {
      const emptyStates = screen.getAllByText('Aún no hay tarjetas');
      expect(emptyStates.length).toBe(3);
    });
  });
});
