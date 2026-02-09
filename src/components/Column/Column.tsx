import styled from '@emotion/styled';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Card as CardType, ColumnId } from '../../types';
import { Card } from '../Card/Card';
import { CardSkeleton } from '../CardSkeleton/CardSkeleton';

const ColumnWrapper = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ColumnHeader = styled.div`
  margin-bottom: 16px;
`;

const ColumnTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardCount = styled.span`
  font-size: 14px;
  color: #6b7280;
  background: #e5e7eb;
  padding: 4px 8px;
  border-radius: 12px;
`;

const CardsContainer = styled.div<{ isOver?: boolean }>`
  flex: 1;
  min-height: 100px;
  border: 2px dashed ${(props) => (props.isOver ? '#3b82f6' : 'transparent')};
  border-radius: 8px;
  transition: border-color 0.2s;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #9ca3af;
  font-size: 14px;
  text-align: center;
`;

interface ColumnProps {
  id: ColumnId;
  title: string;
  cards: CardType[];
  selectedCardIds: string[];
  loading?: boolean;
  onSelectCard: (id: string, multiSelect: boolean) => void;
  onEditCard: (card: CardType) => void;
  onDeleteCard: (id: string) => void;
}

export function Column({
  id,
  title,
  cards,
  selectedCardIds,
  loading = false,
  onSelectCard,
  onEditCard,
  onDeleteCard,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <ColumnWrapper>
      <ColumnHeader>
        <ColumnTitle>
          {title}
          <CardCount>{cards.length}</CardCount>
        </ColumnTitle>
      </ColumnHeader>
      <CardsContainer ref={setNodeRef} isOver={isOver}>
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : cards.length === 0 ? (
          <EmptyState>Aún no hay tarjetas</EmptyState>
        ) : (
          <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                isSelected={selectedCardIds.includes(card.id)}
                onSelect={onSelectCard}
                onEdit={onEditCard}
                onDelete={onDeleteCard}
              />
            ))}
          </SortableContext>
        )}
      </CardsContainer>
    </ColumnWrapper>
  );
}
