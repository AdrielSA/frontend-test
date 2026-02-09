import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as storage from './utils/storage';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.spyOn(storage, 'simulateDelay').mockResolvedValue();
    vi.spyOn(storage, 'loadCards').mockResolvedValue([]);
  });

  it('should render the app', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Kanban Board')).toBeInTheDocument();
    });
  });

  it('should render the Board component', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Por Hacer')).toBeInTheDocument();
    });

    expect(screen.getByText('En Progreso')).toBeInTheDocument();
    expect(screen.getByText('Completado')).toBeInTheDocument();
  });

  it('should render the search bar', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Buscar por título, asignado o etiqueta/)).toBeInTheDocument();
    });
  });

  it('should render the add card button', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('+ Agregar Tarjeta')).toBeInTheDocument();
    });
  });
});
