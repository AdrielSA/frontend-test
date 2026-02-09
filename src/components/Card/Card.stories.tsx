import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import type { Card as CardType } from '../../types';
import { DndContext } from '@dnd-kit/core';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <DndContext>
        <div style={{ maxWidth: '400px' }}>
          <Story />
        </div>
      </DndContext>
    ),
  ],
  args: {
    onSelect: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseCard: CardType = {
  id: '1',
  title: 'Implement SEO optimizations',
  description: 'Add meta tags, improve page speed, and optimize content for search engines',
  tag: 'SEO',
  assignee: 'John Doe',
  dueDate: '2024-06-15',
  columnId: 'todo',
  order: 0,
};

export const Default: Story = {
  args: {
    card: baseCard,
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    card: baseCard,
    isSelected: true,
  },
};

export const LongFormTag: Story = {
  args: {
    card: {
      ...baseCard,
      title: 'Write comprehensive guide',
      description: 'Create a detailed, in-depth article about React best practices',
      tag: 'Long Form',
      assignee: 'Jane Smith',
    },
    isSelected: false,
  },
};

export const BlogPostTag: Story = {
  args: {
    card: {
      ...baseCard,
      title: 'Weekly blog post',
      description: 'Write about the latest features in our product',
      tag: 'Blog Post',
      assignee: 'Alice Johnson',
    },
    isSelected: false,
  },
};

export const Overdue: Story = {
  args: {
    card: {
      ...baseCard,
      title: 'Overdue task',
      description: 'This task is past its due date',
      dueDate: '2023-01-01',
    },
    isSelected: false,
  },
};

export const LongContent: Story = {
  args: {
    card: {
      ...baseCard,
      title: 'A very long title that might wrap to multiple lines in the card interface',
      description:
        'This is a very long description that contains a lot of text and might need to wrap to multiple lines to fit properly in the card component. It demonstrates how the card handles longer content.',
      assignee: 'Christopher Robinson',
    },
    isSelected: false,
  },
};
