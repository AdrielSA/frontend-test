import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmModal } from './ConfirmModal';

describe('ConfirmModal', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Eliminar Tarjeta',
    message: 'Are you sure you want to delete this card?',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  it('should render title and message', () => {
    render(<ConfirmModal {...defaultProps} />);

    expect(screen.getByText('Eliminar Tarjeta')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this card?')).toBeInTheDocument();
  });

  it('should render Cancel and Delete buttons', () => {
    render(<ConfirmModal {...defaultProps} />);

    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Eliminar')).toBeInTheDocument();
  });

  it('should call onConfirm when Delete button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(<ConfirmModal {...defaultProps} onConfirm={onConfirm} />);

    const deleteButton = screen.getByText('Eliminar');
    await user.click(deleteButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when Cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(<ConfirmModal {...defaultProps} onCancel={onCancel} />);

    const cancelButton = screen.getByText('Cancelar');
    await user.click(cancelButton);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when clicking overlay', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    const { container } = render(<ConfirmModal {...defaultProps} onCancel={onCancel} />);

    const overlay = container.firstChild as HTMLElement;
    await user.click(overlay);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should not call onCancel when clicking modal content', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(<ConfirmModal {...defaultProps} onCancel={onCancel} />);

    const modal = screen.getByText('Eliminar Tarjeta').closest('div');
    if (modal) {
      await user.click(modal);
    }

    expect(onCancel).not.toHaveBeenCalled();
  });

  it('should not render when isOpen is false', () => {
    render(<ConfirmModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Eliminar Tarjeta')).not.toBeInTheDocument();
  });

  it('should render custom title and message', () => {
    render(
      <ConfirmModal
        {...defaultProps}
        title="Custom Title"
        message="Custom message content"
      />
    );

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom message content')).toBeInTheDocument();
  });
});
