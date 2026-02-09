import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import type { CardFormData, Tag, Card } from '../../types';
import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 10px 12px;
  border: 1px solid ${(props) => (props.hasError ? '#ef4444' : '#d1d5db')};
  border-radius: 6px;
  font-size: 14px;
  color: #1f2937;
  background-color: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  padding: 10px 12px;
  border: 1px solid ${(props) => (props.hasError ? '#ef4444' : '#d1d5db')};
  border-radius: 6px;
  font-size: 14px;
  color: #1f2937;
  background-color: white;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  padding: 10px 12px;
  border: 1px solid ${(props) => (props.hasError ? '#ef4444' : '#d1d5db')};
  border-radius: 6px;
  font-size: 14px;
  color: #1f2937;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #ef4444;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 1;

  ${(props) =>
    props.variant === 'primary'
      ? `
    background-color: #3b82f6;
    color: white;
    &:hover {
      background-color: #2563eb;
    }
    &:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
  `
      : `
    background-color: #f3f4f6;
    color: #374151;
    &:hover {
      background-color: #e5e7eb;
    }
  `}
`;

interface CardModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  card?: Card;
  onClose: () => void;
  onSubmit: (data: CardFormData) => void;
}

const tagOptions: Tag[] = ['SEO', 'Contenido Largo', 'Artículo de Blog'];

export function CardModal({ isOpen, mode, card, onClose, onSubmit }: CardModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CardFormData>({
    defaultValues: card
      ? {
          title: card.title,
          description: card.description,
          tag: card.tag,
          assignee: card.assignee,
          dueDate: card.dueDate,
        }
      : undefined,
  });

  useEffect(() => {
    if (isOpen && card) {
      reset({
        title: card.title,
        description: card.description,
        tag: card.tag,
        assignee: card.assignee,
        dueDate: card.dueDate,
      });
    } else if (isOpen && !card) {
      reset({
        title: '',
        description: '',
        tag: 'SEO',
        assignee: '',
        dueDate: '',
      });
    }
  }, [isOpen, card, reset]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onFormSubmit = (data: CardFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <ModalHeader>
          <ModalTitle>{mode === 'create' ? 'Crear Nueva Tarjeta' : 'Editar Tarjeta'}</ModalTitle>
          <CloseButton onClick={onClose} type="button">
            <FiX />
          </CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <FormGroup>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              type="text"
              hasError={!!errors.title}
              {...register('title', { required: 'El título es requerido' })}
            />
            {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Descripción *</Label>
            <TextArea
              id="description"
              hasError={!!errors.description}
              {...register('description', { required: 'La descripción es requerida' })}
            />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="tag">Etiqueta *</Label>
            <Select
              id="tag"
              hasError={!!errors.tag}
              {...register('tag', { required: 'La etiqueta es requerida' })}
            >
              {tagOptions.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Select>
            {errors.tag && <ErrorMessage>{errors.tag.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="assignee">Asignado a *</Label>
            <Input
              id="assignee"
              type="text"
              hasError={!!errors.assignee}
              {...register('assignee', { required: 'El asignado es requerido' })}
            />
            {errors.assignee && <ErrorMessage>{errors.assignee.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="dueDate">Fecha de Vencimiento *</Label>
            <Input
              id="dueDate"
              type="date"
              hasError={!!errors.dueDate}
              {...register('dueDate', { required: 'La fecha de vencimiento es requerida' })}
            />
            {errors.dueDate && <ErrorMessage>{errors.dueDate.message}</ErrorMessage>}
          </FormGroup>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {mode === 'create' ? 'Crear' : 'Guardar'}
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
}
