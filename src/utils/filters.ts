import type { Card } from '../types';

export const filterCards = (cards: Card[], query: string): Card[] => {
  if (!query || query.trim() === '') {
    return cards;
  }

  const lowerQuery = query.toLowerCase().trim();

  return cards.filter((card) => {
    const titleMatch = card.title.toLowerCase().includes(lowerQuery);
    const assigneeMatch = card.assignee.toLowerCase().includes(lowerQuery);
    const tagMatch = card.tag.toLowerCase().includes(lowerQuery);

    return titleMatch || assigneeMatch || tagMatch;
  });
};
