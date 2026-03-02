# Swiper Carousel Web Component

A fully-featured, accessible carousel web component built with Lit and Swiper.js. This component allows you to create beautiful, responsive carousels with external web components as items.

## Features

- ✨ **Built with Lit** - Modern web components powered by Lit
- 🎠 **Swiper.js Integration** - Professional carousel functionality
- ♿ **Accessible** - Full ARIA attribute support for screen readers
- 📱 **Responsive** - Configurable breakpoints for different screen sizes
- ⌨️ **Keyboard Navigation** - Arrow key support out of the box
- 🎨 **Customizable** - Style with CSS custom properties
- 🔄 **Loop Mode** - Infinite carousel looping
- ⏱️ **Auto-play** - Optional automatic slide advancement
- 🧩 **Flexible** - Use any web component or HTML as carousel items

## Installation

```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

Run Storybook for component development and testing:

```bash
npm run storybook
```

Build for production:

```bash
npm run build
```

Build Storybook:

```bash
npm run build-storybook
```

## Usage

### Basic Example

**Important:** Each carousel item must be wrapped in a `<div class="swiper-slide">` element.

```html
<swiper-carousel>
  <div class="swiper-slide">
    <carousel-item
      icon="🚀"
      title="Item 1"
      description="First carousel item"
    ></carousel-item>
  </div>
  <div class="swiper-slide">
    <carousel-item
      icon="⚡"
      title="Item 2"
      description="Second carousel item"
    ></carousel-item>
  </div>
</swiper-carousel>
```

### Multiple Slides with Breakpoints

```html
<swiper-carousel 
  slides-per-view="1"
  space-between="20"
  breakpoints='{"640": 2, "768": 3, "1024": 4}'
>
  <!-- slides here -->
</swiper-carousel>
```

### Loop Mode with Auto-play

```html
<swiper-carousel 
  loop
  autoplay="3000"
>
  <!-- slides here -->
</swiper-carousel>
```

### Custom Web Components

You can use any web component or HTML content as carousel items:

```html
<swiper-carousel>
  <div class="swiper-slide">
    <your-custom-component></your-custom-component>
  </div>
  <div class="swiper-slide">
    <another-component></another-component>
  </div>
</swiper-carousel>
```

## API

### `<swiper-carousel>` Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `slides-per-view` | Number | `1` | Number of slides visible at once |
| `space-between` | Number | `16` | Space between slides in pixels |
| `navigation` | Boolean | `true` | Enable/disable navigation arrows |
| `pagination` | Boolean | `true` | Enable/disable pagination dots |
| `loop` | Boolean | `false` | Enable infinite loop mode |
| `autoplay` | Number | `0` | Auto-play delay in milliseconds (0 to disable) |
| `keyboard` | Boolean | `true` | Enable keyboard navigation |
| `breakpoints` | String | `''` | JSON string of responsive breakpoints |

### Methods

| Method | Description |
|--------|-------------|
| `next()` | Navigate to the next slide |
| `prev()` | Navigate to the previous slide |
| `slideTo(index)` | Navigate to a specific slide by index |
| `activeIndex` | Get the current active slide index (getter) |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `slideChange` | `{ activeIndex, previousIndex }` | Fired when the active slide changes |

### CSS Custom Properties

```css
swiper-carousel {
  --swiper-navigation-color: #007aff;
  --swiper-navigation-bg: rgba(255, 255, 255, 0.9);
  --swiper-navigation-size: 44px;
  --swiper-pagination-color: #007aff;
  --swiper-focus-color: #007aff; /* Focus outline color */
}
```

### `<carousel-item>` Properties

The included example `carousel-item` component has these properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | String | `''` | Item title |
| `description` | String | `''` | Item description |
| `image-url` | String | `''` | Image URL |
| `image-alt` | String | `''` | Image alt text |
| `icon` | String | `''` | Icon/emoji to display |

### CSS Custom Properties for Items

```css
carousel-item {
  --item-bg-color: #f5f5f5;
  --item-title-color: #333;
  --item-description-color: #666;
}
```

## Programmatic Control

```javascript
const carousel = document.querySelector('swiper-carousel');

// Navigate programmatically
carousel.next();
carousel.prev();
carousel.slideTo(2);

// Get current slide
console.log(carousel.activeIndex);

// Listen to slide changes
carousel.addEventListener('slideChange', (e) => {
  console.log('Active slide:', e.detail.activeIndex);
  console.log('Previous slide:', e.detail.previousIndex);
});
```

## Accessibility

The carousel includes comprehensive accessibility features:

- **ARIA Attributes**: Proper `role`, `aria-label`, and `aria-roledescription` attributes
- **Keyboard Navigation**: Arrow keys for navigation (when carousel is focused)
- **Screen Reader Support**: Descriptive labels for all interactive elements
- **Focus Management**: Clear focus indicators for navigation controls and carousel itself

### Keyboard Shortcuts

**Important:** Click on the carousel or tab to it to focus it before using keyboard shortcuts. This ensures only the focused carousel responds to keyboard input when multiple carousels are on the page.

- `Tab` - Focus the carousel or navigate through navigation controls
- `←` (Left Arrow) - Previous slide (when carousel is focused)
- `→` (Right Arrow) - Next slide (when carousel is focused)
- `Enter/Space` - Activate focused control (pagination/navigation buttons)

When a carousel is focused, it will show a visible outline to indicate it's active.

## Browser Support

All modern browsers that support:
- Web Components (Custom Elements v1)
- ES2020
- CSS Custom Properties

## License

MIT

## Credits

Built with:
- [Lit](https://lit.dev/) - Web component library
- [Swiper.js](https://swiperjs.com/) - Modern carousel library
