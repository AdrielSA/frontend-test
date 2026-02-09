import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchBar } from './SearchBar';
import { useState } from 'react';


const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onChange: () => {},
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: '',
  },
};

export const WithValue: Story = {
  args: {
    value: 'SEO',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    value: '',
    placeholder: 'Type to filter...',
  },
};

export const Interactive: Story = {
  args: {
    value: '',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SearchBar value={value} onChange={setValue} />;
  },
};

export const InteractiveWithInitialValue: Story = {
  args: {
    value: 'John Doe',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SearchBar value={value} onChange={setValue} />;
  },
};
