import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfirmModal } from './ConfirmModal';


const meta = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onConfirm: () => {},
    onCancel: () => {},
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Delete Card',
    message: 'Are you sure you want to delete this card? This action cannot be undone.',
  },
};

export const LongMessage: Story = {
  args: {
    isOpen: true,
    title: 'Delete Multiple Cards',
    message:
      'You are about to delete 5 cards. This will permanently remove all selected cards and their data from your board. This action cannot be undone and all progress will be lost.',
  },
};

export const CustomWarning: Story = {
  args: {
    isOpen: true,
    title: 'Clear Board',
    message: 'This will remove all cards from the board. Are you sure you want to continue?',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Delete Card',
    message: 'Are you sure you want to delete this card?',
  },
};
