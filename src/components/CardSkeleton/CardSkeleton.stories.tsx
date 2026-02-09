import type { Meta, StoryObj } from '@storybook/react';
import { CardSkeleton } from './CardSkeleton';

const meta = {
  title: 'Components/CardSkeleton',
  component: CardSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  render: () => (
    <div>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  ),
};
