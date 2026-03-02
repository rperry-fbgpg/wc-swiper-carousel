import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './swiper-carousel';
import './carousel-item';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/SwiperCarousel',
  tags: ['autodocs'],
  render: (args) => html`
    <swiper-carousel
      .slidesPerView=${args.slidesPerView}
      .spaceBetween=${args.spaceBetween}
      .navigation=${args.navigation}
      .pagination=${args.pagination}
      .loop=${args.loop}
      .autoplay=${args.autoplay}
      .keyboard=${args.keyboard}
      .breakpoints=${args.breakpoints}
    >
      ${args.slides?.map((slide: any, index: number) => html`
        <div class="swiper-slide" style="
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${slide.background || `linear-gradient(135deg, ${getGradientColors(index)})`};
          border-radius: 12px;
          color: white;
          font-size: 48px;
          font-weight: bold;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        ">
          ${slide.content}
        </div>
      `)}
    </swiper-carousel>
  `,
  argTypes: {
    slidesPerView: {
      control: { type: 'number', min: 1, max: 5, step: 0.5 },
      description: 'Number of slides visible at once',
    },
    spaceBetween: {
      control: { type: 'number', min: 0, max: 50, step: 5 },
      description: 'Space between slides in pixels',
    },
    navigation: {
      control: 'boolean',
      description: 'Enable navigation arrows',
    },
    pagination: {
      control: 'boolean',
      description: 'Enable pagination dots',
    },
    loop: {
      control: 'boolean',
      description: 'Enable infinite loop mode',
    },
    autoplay: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
      description: 'Autoplay delay in milliseconds (0 to disable)',
    },
    keyboard: {
      control: 'boolean',
      description: 'Enable keyboard navigation',
    },
    breakpoints: {
      control: 'text',
      description: 'Responsive breakpoints (JSON string)',
    },
  },
  args: {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: true,
    pagination: true,
    loop: false,
    autoplay: 0,
    keyboard: true,
    breakpoints: '',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// Helper function to generate gradient colors
function getGradientColors(index: number): string {
  const gradients = [
    '#667eea 0%, #764ba2 100%',
    '#11998e 0%, #38ef7d 100%',
    '#ff6b6b 0%, #feca57 100%',
    '#fa709a 0%, #fee140 100%',
    '#4facfe 0%, #00f2fe 100%',
  ];
  return gradients[index % gradients.length];
}

// Default slides
const defaultSlides = [
  { content: '🚀 Slide 1' },
  { content: '⚡ Slide 2' },
  { content: '🎨 Slide 3' },
  { content: '✨ Slide 4' },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    slides: defaultSlides,
  },
};

export const MultipleSlides: Story = {
  args: {
    slidesPerView: 3,
    spaceBetween: 20,
    slides: [
      { content: '📱 Mobile' },
      { content: '💻 Laptop' },
      { content: '🖥️ Desktop' },
      { content: '⌚ Watch' },
      { content: '🎮 Console' },
      { content: '📺 TV' },
    ],
  },
};

export const WithAutoplay: Story = {
  args: {
    autoplay: 3000,
    loop: true,
    slides: [
      { content: '🌅 Morning' },
      { content: '☀️ Afternoon' },
      { content: '🌆 Evening' },
      { content: '🌙 Night' },
    ],
  },
};

export const LoopMode: Story = {
  args: {
    loop: true,
    slides: [
      { content: '1️⃣ First' },
      { content: '2️⃣ Second' },
      { content: '3️⃣ Third' },
    ],
  },
};

export const NoNavigation: Story = {
  args: {
    navigation: false,
    slides: defaultSlides,
  },
};

export const NoPagination: Story = {
  args: {
    pagination: false,
    slides: defaultSlides,
  },
};

export const MinimalControls: Story = {
  args: {
    navigation: false,
    pagination: false,
    slides: defaultSlides,
  },
};

export const ResponsiveBreakpoints: Story = {
  args: {
    slidesPerView: 1,
    spaceBetween: 15,
    breakpoints: '{"640": 2, "768": 3, "1024": 4}',
    slides: [
      { content: '1' },
      { content: '2' },
      { content: '3' },
      { content: '4' },
      { content: '5' },
      { content: '6' },
    ],
  },
};

export const CustomSpacing: Story = {
  args: {
    slidesPerView: 2,
    spaceBetween: 40,
    slides: [
      { content: 'A' },
      { content: 'B' },
      { content: 'C' },
      { content: 'D' },
    ],
  },
};

export const WithCarouselItems: Story = {
  render: (args) => html`
    <swiper-carousel
      .slidesPerView=${args.slidesPerView}
      .spaceBetween=${args.spaceBetween}
      .navigation=${args.navigation}
      .pagination=${args.pagination}
      .loop=${args.loop}
      .autoplay=${args.autoplay}
    >
      <div class="swiper-slide">
        <carousel-item
          icon="🚀"
          title="Launch"
          description="Take your projects to new heights with modern web components."
          style="--item-bg-color: #e3f2fd; --item-title-color: #1565c0;"
        ></carousel-item>
      </div>
      <div class="swiper-slide">
        <carousel-item
          icon="⚡"
          title="Fast"
          description="Lightning-fast performance with optimized rendering."
          style="--item-bg-color: #f3e5f5; --item-title-color: #6a1b9a;"
        ></carousel-item>
      </div>
      <div class="swiper-slide">
        <carousel-item
          icon="🎨"
          title="Customizable"
          description="Style it your way with CSS custom properties."
          style="--item-bg-color: #e8f5e9; --item-title-color: #2e7d32;"
        ></carousel-item>
      </div>
      <div class="swiper-slide">
        <carousel-item
          icon="♿"
          title="Accessible"
          description="Built with ARIA attributes for full accessibility support."
          style="--item-bg-color: #fff3e0; --item-title-color: #e65100;"
        ></carousel-item>
      </div>
    </swiper-carousel>
  `,
  args: {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: true,
    loop: false,
    autoplay: 0,
  },
};
