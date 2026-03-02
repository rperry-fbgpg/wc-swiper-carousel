import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './carousel-item';

const meta = {
  title: 'Components/CarouselItem',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="max-width: 400px; margin: 0 auto;">
      <carousel-item
        .title=${args.title}
        .description=${args.description}
        .imageUrl=${args.imageUrl}
        .imageAlt=${args.imageAlt}
        .icon=${args.icon}
        style="
          --item-bg-color: ${args.bgColor};
          --item-title-color: ${args.titleColor};
          --item-description-color: ${args.descriptionColor};
        "
      ></carousel-item>
    </div>
  `,
  argTypes: {
    title: {
      control: 'text',
      description: 'Item title',
    },
    description: {
      control: 'text',
      description: 'Item description',
    },
    imageUrl: {
      control: 'text',
      description: 'Image URL',
    },
    imageAlt: {
      control: 'text',
      description: 'Image alt text',
    },
    icon: {
      control: 'text',
      description: 'Icon or emoji',
    },
    bgColor: {
      control: 'color',
      description: 'Background color',
    },
    titleColor: {
      control: 'color',
      description: 'Title color',
    },
    descriptionColor: {
      control: 'color',
      description: 'Description color',
    },
  },
  args: {
    title: '',
    description: '',
    imageUrl: '',
    imageAlt: '',
    icon: '',
    bgColor: '#f5f5f5',
    titleColor: '#333',
    descriptionColor: '#666',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    icon: '🎨',
    title: 'Carousel Item',
    description: 'This is a reusable carousel item component with customizable properties.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: '🚀',
    title: 'Launch Your Project',
    description: 'Get started with modern web components and build amazing experiences.',
    bgColor: '#e3f2fd',
    titleColor: '#1565c0',
  },
};

export const WithImage: Story = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop',
    imageAlt: 'Abstract gradient',
    title: 'Beautiful Design',
    description: 'Create stunning carousels with images and custom styling.',
    bgColor: '#f3e5f5',
    titleColor: '#6a1b9a',
  },
};

export const MinimalWithIconOnly: Story = {
  args: {
    icon: '⚡',
    bgColor: '#fff3e0',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Simple Title',
    bgColor: '#e8f5e9',
    titleColor: '#2e7d32',
  },
};

export const TitleAndDescription: Story = {
  args: {
    title: 'Feature Title',
    description: 'A detailed description explaining the feature and its benefits to users.',
    bgColor: '#fce4ec',
    titleColor: '#c2185b',
  },
};

export const CustomColors: Story = {
  args: {
    icon: '🌈',
    title: 'Custom Styling',
    description: 'Easily customize colors with CSS custom properties.',
    bgColor: '#e0f2f1',
    titleColor: '#00695c',
    descriptionColor: '#004d40',
  },
};

export const LongContent: Story = {
  args: {
    icon: '📝',
    title: 'Long Form Content Example',
    description: 'This is a longer description to demonstrate how the component handles multiple lines of text. It should wrap nicely and maintain good readability throughout.',
    bgColor: '#fff3e0',
    titleColor: '#e65100',
  },
};
