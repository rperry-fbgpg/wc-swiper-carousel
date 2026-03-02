import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { carouselItemStyles } from './carousel-item.styles.js';

/**
 * An example carousel item web component
 * 
 * @csspart container - The item container
 * @csspart image - The image element
 * @csspart title - The title element
 * @csspart description - The description element
 */
@customElement('carousel-item')
export class CarouselItem extends LitElement {
  static styles = carouselItemStyles;

  /**
   * The item title
   */
  @property({ type: String })
  title = '';

  /**
   * The item description
   */
  @property({ type: String })
  description = '';

  /**
   * Image URL for the item
   */
  @property({ type: String })
  imageUrl = '';

  /**
   * Icon/emoji to display (alternative to image)
   */
  @property({ type: String })
  icon = '';

  /**
   * Alt text for the image
   */
  @property({ type: String })
  imageAlt = '';

  render() {
    return html`
      <div class="item-container" part="container" role="group" aria-label="${this.title || 'Carousel item'}">
        ${this.icon
          ? html`<div class="item-icon" aria-hidden="true">${this.icon}</div>`
          : ''}
        ${this.imageUrl
          ? html`<img
              class="item-image"
              part="image"
              src="${this.imageUrl}"
              alt="${this.imageAlt || this.title}"
              loading="lazy"
            />`
          : ''}
        ${this.title
          ? html`<h3 class="item-title" part="title">${this.title}</h3>`
          : ''}
        ${this.description
          ? html`<p class="item-description" part="description">${this.description}</p>`
          : ''}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'carousel-item': CarouselItem;
  }
}
