import { css } from 'lit';

export const swiperCarouselStyles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    outline: none;
  }

  :host(:focus) {
    outline: 3px solid var(--swiper-focus-color, #007aff);
    outline-offset: 4px;
    border-radius: 4px;
  }

  :host(:focus-visible) {
    outline: 3px solid var(--swiper-focus-color, #007aff);
    outline-offset: 4px;
    border-radius: 4px;
  }

  .swiper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
  }

  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }

  .swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
  }

  .swiper-button-prev,
  .swiper-button-next {
    /* Button reset */
    border: none;
    padding: 0;
    font: inherit;
    outline: inherit;
    
    /* Positioning and size */
    position: absolute;
    top: 50%;
    width: var(--swiper-navigation-size, 44px);
    height: var(--swiper-navigation-size, 44px);
    margin-top: calc(-1 * var(--swiper-navigation-size, 44px) / 2);
    z-index: 10;
    cursor: pointer;
    
    /* Layout */
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Appearance */
    color: var(--swiper-navigation-color, #007aff);
    background: var(--swiper-navigation-bg, rgba(255, 255, 255, 0.9));
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }

  .swiper-button-prev {
    left: 10px;
    right: auto;
  }

  .swiper-button-next {
    right: 10px;
    left: auto;
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .swiper-button-prev::after {
    content: '‹';
    font-size: 32px;
    font-weight: bold;
  }

  .swiper-button-next::after {
    content: '›';
    font-size: 32px;
    font-weight: bold;
  }

  .swiper-button-disabled {
    opacity: 0.35;
    cursor: not-allowed;
    pointer-events: none;
  }

  .swiper-pagination {
    position: relative;
    margin-top: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 50%;
    background: var(--swiper-pagination-color, #007aff);
    opacity: 0.4;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .swiper-pagination-bullet:hover {
    opacity: 0.7;
    transform: scale(1.2);
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    transform: scale(1.3);
  }
`;
