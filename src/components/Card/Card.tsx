import styled from '@emotion/styled';
import { format } from 'date-fns';
import type { Card as CardType, Tag } from '../../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiUser, FiCalendar } from 'react-icons/fi';

const tagColors: Record<Tag, string> = {
  SEO: '#3b82f6',
  'Contenido Largo': '#8b5cf6',
  'Artículo de Blog': '#10b981',
};

const CardWrapper = styled.div<{ isDragging?: boolean; isSelected?: boolean }>`
  background: #fff;
  border: 2px solid ${(props) => (props.isSelected ? '#3b82f6' : '#e0e0e0')};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: grab;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
  }

  &:active {
    cursor: grabbing;
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

const CardDescription = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const TagBadge = styled.span<{ color: string }>`
  background: ${(props) => props.color};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const Assignee = styled.div`
  font-size: 14px;
  color: #4b5563;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DueDate = styled.div<{ overdue?: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.overdue ? '#ef4444' : '#6b7280')};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const Button = styled.button<{ variant?: 'edit' | 'delete' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${(props) => (props.variant === 'delete' ? '#ef4444' : '#3b82f6')};
  color: white;
  touch-action: none;

  &:hover {
    background-color: ${(props) => (props.variant === 'delete' ? '#dc2626' : '#2563eb')};
  }
`;

interface CardProps {
  card: CardType;
  isSelected: boolean;
  onSelect: (id: string, multiSelect: boolean) => void;
  onEdit: (card: CardType) => void;
  onDelete: (id: string) => void;
}

export function Card({ card, isSelected, onSelect, onEdit, onDelete }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isOverdue = new Date(card.dueDate) < new Date();

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onSelect(card.id, e.ctrlKey || e.metaKey || e.shiftKey);
  };

  return (
    <CardWrapper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      isDragging={isDragging}
      isSelected={isSelected}
      onClick={handleClick}
    >
      <CardTitle>{card.title}</CardTitle>
      <CardDescription>{card.description}</CardDescription>
      <CardMeta>
        <TagBadge color={tagColors[card.tag]}>{card.tag}</TagBadge>
        <Assignee>
          <FiUser />
          {card.assignee}
        </Assignee>
      </CardMeta>
      <DueDate overdue={isOverdue}>
        <FiCalendar />
        {format(new Date(card.dueDate), 'MMM dd, yyyy')}
      </DueDate>
      <CardActions>
        <Button
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(card);
          }}
        >
          Editar
        </Button>
        <Button
          variant="delete"
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
        >
          Eliminar
        </Button>
      </CardActions>
    </CardWrapper>
  );
}
