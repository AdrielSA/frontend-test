export type Tag = 'SEO' | 'Contenido Largo' | 'Artículo de Blog';

export type ColumnId = 'todo' | 'inProgress' | 'done';

export interface Card {
  id: string;
  title: string;
  description: string;
  tag: Tag;
  assignee: string;
  dueDate: string;
  columnId: ColumnId;
  order: number;
}

export interface Column {
  id: ColumnId;
  title: string;
  cardIds: string[];
}

export interface CardFormData {
  title: string;
  description: string;
  tag: Tag;
  assignee: string;
  dueDate: string;
}
