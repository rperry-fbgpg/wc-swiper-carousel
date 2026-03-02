# Storybook Guide

This project includes Storybook for interactive component development and testing.

## Starting Storybook

Run the following command to start Storybook:

```bash
npm run storybook
```

Storybook will start on `http://localhost:6006`

## Available Stories

### Components/SwiperCarousel

Interactive stories for the main carousel component:

- **Default** - Basic carousel with standard settings
- **Multiple Slides** - Display multiple slides at once
- **With Autoplay** - Automatically advancing carousel
- **Loop Mode** - Infinite loop carousel
- **No Navigation** - Carousel without navigation arrows
- **No Pagination** - Carousel without pagination dots
- **Minimal Controls** - No navigation or pagination
- **Responsive Breakpoints** - Different slides per view at different screen sizes
- **Custom Spacing** - Adjustable space between slides
- **With Carousel Items** - Using the carousel-item component

### Components/CarouselItem

Stories for the carousel item component:

- **Default** - Basic item with icon, title, and description
- **With Icon** - Item with emoji/icon only
- **With Image** - Item with actual image
- **Minimal** - Various minimal configurations
- **Custom Colors** - Customized color schemes
- **Long Content** - Handling longer text content

## Interactive Controls

Each story has interactive controls in the "Controls" tab where you can:

- Adjust `slidesPerView` (number of slides visible)
- Change `spaceBetween` (spacing between slides)
- Toggle `navigation` arrows on/off
- Toggle `pagination` dots on/off
- Enable/disable `loop` mode
- Set `autoplay` delay in milliseconds
- Toggle `keyboard` navigation
- Configure responsive `breakpoints`

## Actions

The "Actions" tab shows events fired by the components:
- `slideChange` - When the active slide changes

## Accessibility Testing

Use Storybook's accessibility addon to:
- Check ARIA attributes
- Verify keyboard navigation
- Test screen reader compatibility

## Building Storybook

To build a static version of Storybook:

```bash
npm run build-storybook
```

The static files will be in the `storybook-static` directory.

## Tips

1. **Focus Testing**: Click on a carousel to focus it, then use arrow keys to test keyboard navigation
2. **Multiple Carousels**: Open multiple story variants to test focus management
3. **Responsive**: Resize the viewport to test responsive breakpoints
4. **Custom Properties**: Use browser DevTools to inspect and modify CSS custom properties
5. **Events**: Watch the Actions panel to see real-time event firing

## Creating New Stories

Add new stories by creating `*.stories.ts` files in the `src` directory:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './your-component';

const meta = {
  title: 'Components/YourComponent',
  tags: ['autodocs'],
  render: (args) => html`<your-component></your-component>`,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};
```
