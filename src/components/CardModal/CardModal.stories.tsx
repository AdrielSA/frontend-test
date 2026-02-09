import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardModal } from './CardModal';
import type { Card } from '../../types';


const meta = {
  title: 'Components/CardModal',
  component: CardModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClose: () => {},
    onSubmit: () => {},
  },
} satisfies Meta<typeof CardModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCard: Card = {
  id: '1',
  title: 'Optimize SEO',
  description: 'Improve website ranking on search engines',
  tag: 'SEO',
  assignee: 'John Doe',
  dueDate: '2024-06-15',
  columnId: 'todo',
  order: 0,
};

export const CreateMode: Story = {
  args: {
    isOpen: true,
    mode: 'create',
  },
};

export const EditMode: Story = {
  args: {
    isOpen: true,
    mode: 'edit',
    card: mockCard,
  },
};

export const EditModeLongContent: Story = {
  args: {
    isOpen: true,
    mode: 'edit',
    card: {
      ...mockCard,
      title: 'A very long title that demonstrates how the modal handles longer text content',
      description:
        'This is a very long description that shows how the textarea handles multiple lines of text. It can contain a lot of information about the task, including detailed requirements, acceptance criteria, and any other relevant information that the team needs to know.',
      assignee: 'Christopher Robinson-Anderson',
    },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    mode: 'create',
  },
};
