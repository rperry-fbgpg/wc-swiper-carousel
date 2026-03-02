import { css } from 'lit';

export const carouselItemStyles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }

  .item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--item-bg-color, #f5f5f5);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    height: 100%;
    min-height: 300px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .item-container:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .item-image {
    width: 100%;
    max-width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .item-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--item-title-color, #333);
    margin: 0 0 8px 0;
    text-align: center;
  }

  .item-description {
    font-size: 1rem;
    color: var(--item-description-color, #666);
    margin: 0;
    text-align: center;
    line-height: 1.5;
  }

  .item-icon {
    font-size: 4rem;
    margin-bottom: 16px;
  }
`;
