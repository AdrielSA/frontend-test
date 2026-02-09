import type { Meta, StoryObj } from '@storybook/react-vite';
import { Column } from './Column';
import type { Card } from '../../types';
import { DndContext } from '@dnd-kit/core';


const meta = {
  title: 'Components/Column',
  component: Column,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <DndContext>
        <div style={{ height: '600px' }}>
          <Story />
        </div>
      </DndContext>
    ),
  ],
  args: {
    onSelectCard: () => {},
    onEditCard: () => {},
    onDeleteCard: () => {},
  },
} satisfies Meta<typeof Column>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCards: Card[] = [
  {
    id: '1',
    title: 'SEO Optimization',
    description: 'Improve website SEO',
    tag: 'SEO',
    assignee: 'John Doe',
    dueDate: '2024-06-15',
    columnId: 'todo',
    order: 0,
  },
  {
    id: '2',
    title: 'Write Blog Post',
    description: 'Create content',
    tag: 'Artículo de Blog',
    assignee: 'Jane Smith',
    dueDate: '2024-06-20',
    columnId: 'todo',
    order: 1,
  },
  {
    id: '3',
    title: 'Long Form Article',
    description: 'Detailed article',
    tag: 'Contenido Largo',
    assignee: 'John Doe',
    dueDate: '2024-06-25',
    columnId: 'todo',
    order: 2,
  },
];

export const WithCards: Story = {
  args: {
    id: 'todo',
    title: 'To Do',
    cards: mockCards,
    selectedCardIds: [],
  },
};

export const Empty: Story = {
  args: {
    id: 'done',
    title: 'Done',
    cards: [],
    selectedCardIds: [],
  },
};

export const Loading: Story = {
  args: {
    id: 'inProgress',
    title: 'In Progress',
    cards: [],
    selectedCardIds: [],
    loading: true,
  },
};

export const WithSelection: Story = {
  args: {
    id: 'todo',
    title: 'To Do',
    cards: mockCards,
    selectedCardIds: ['1', '3'],
  },
};

export const SingleCard: Story = {
  args: {
    id: 'inProgress',
    title: 'In Progress',
    cards: [mockCards[0]],
    selectedCardIds: [],
  },
};
