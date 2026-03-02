import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { swiperCarouselStyles } from './swiper-carousel.styles.js';
import Swiper from 'swiper';
import { Navigation, Pagination, A11y, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * A carousel web component built with Lit and Swiper.js
 * 
 * Add carousel items as direct children (wrapped in div.swiper-slide elements).
 * The component will automatically move them into the shadow DOM for Swiper to manage.
 * 
 * @fires slideChange - Fired when the active slide changes
 * 
 * @csspart container - The carousel container
 * @csspart wrapper - The slides wrapper
 * @csspart slide - Individual slide containers
 * @csspart button-prev - Previous navigation button
 * @csspart button-next - Next navigation button
 * @csspart pagination - Pagination container
 */
@customElement('swiper-carousel')
export class SwiperCarousel extends LitElement {
  static styles = swiperCarouselStyles;

  /**
   * Number of slides visible at once
   */
  @property({ type: Number })
  slidesPerView = 1;

  /**
   * Space between slides in pixels
   */
  @property({ type: Number })
  spaceBetween = 16;

  /**
   * Enable navigation arrows
   */
  @property({ type: Boolean })
  navigation = true;

  /**
   * Enable pagination dots
   */
  @property({ type: Boolean })
  pagination = true;

  /**
   * Enable loop mode
   */
  @property({ type: Boolean })
  loop = false;

  /**
   * Enable autoplay (time in ms, 0 to disable)
   */
  @property({ type: Number })
  autoplay = 0;

  /**
   * Enable keyboard navigation
   */
  @property({ type: Boolean })
  keyboard = true;

  /**
   * Slides per view at different breakpoints (JSON string)
   * Example: '{"640": 2, "768": 3, "1024": 4}'
   */
  @property({ type: String })
  breakpoints = '';

  @query('.swiper')
  private swiperContainer!: HTMLElement;

  @query('.swiper-wrapper')
  private swiperWrapper!: HTMLElement;

  @query('.swiper-button-next')
  private buttonNext?: HTMLElement;

  @query('.swiper-button-prev')
  private buttonPrev?: HTMLElement;

  @query('.swiper-pagination')
  private paginationEl?: HTMLElement;

  private swiper: Swiper | null = null;
  private isFocused = false;

  private syncPagination(swiperInstance?: Swiper) {
    const swiper = swiperInstance ?? this.swiper;
    if (!swiper || !this.pagination || !swiper.pagination) return;

    swiper.updateSlidesClasses();
    swiper.pagination.render();
    swiper.pagination.update();
  }

  connectedCallback() {
    super.connectedCallback();
    // Make carousel focusable
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    // Add focus/blur handlers
    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('blur', this.handleBlur);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.handleFocus);
    this.removeEventListener('blur', this.handleBlur);
    this.destroySwiper();
  }

  firstUpdated() {
    // Move light DOM children into shadow DOM wrapper
    requestAnimationFrame(() => {
      this.moveChildrenToWrapper();
      this.initSwiper();
      this.setupContentObserver();
      this.setupKeyboardHandlers();
    });
  }

  private handleFocus = () => {
    this.isFocused = true;
    if (this.swiper && this.keyboard) {
      this.swiper.keyboard.enable();
    }
  };

  private handleBlur = () => {
    this.isFocused = false;
    if (this.swiper && this.keyboard) {
      this.swiper.keyboard.disable();
    }
  };

  private setupKeyboardHandlers() {
    // Initially disable keyboard if we have it enabled
    if (this.swiper && this.keyboard && !this.isFocused) {
      this.swiper.keyboard.disable();
    }
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    // Reinitialize swiper if relevant properties change
    if (
      changedProperties.has('slidesPerView') ||
      changedProperties.has('spaceBetween') ||
      changedProperties.has('navigation') ||
      changedProperties.has('pagination') ||
      changedProperties.has('loop') ||
      changedProperties.has('autoplay') ||
      changedProperties.has('keyboard') ||
      changedProperties.has('breakpoints')
    ) {
      this.destroySwiper();
      requestAnimationFrame(() => {
        this.initSwiper();
        this.setupKeyboardHandlers();
      });
    }
  }

  private moveChildrenToWrapper() {
    // Move all light DOM children into the swiper-wrapper
    if (!this.swiperWrapper) {
      console.warn('Swiper wrapper not found');
      return;
    }
    
    // Clear existing content
    this.swiperWrapper.innerHTML = '';
    
    // Move all children from light DOM to shadow DOM wrapper
    const childCount = this.children.length;
    console.log(`Moving ${childCount} children to swiper wrapper`);
    
    while (this.children.length > 0) {
      const child = this.children[0];
      // Ensure it has swiper-slide class
      if (!child.classList.contains('swiper-slide')) {
        child.classList.add('swiper-slide');
      }
      this.swiperWrapper.appendChild(child);
    }
    
    console.log(`Moved children. Wrapper now has ${this.swiperWrapper.children.length} slides`);
  }

  private setupContentObserver() {
    // Watch for changes in light DOM children
    const observer = new MutationObserver(() => {
      this.destroySwiper();
      requestAnimationFrame(() => {
        this.moveChildrenToWrapper();
        this.initSwiper();
        this.setupKeyboardHandlers();
      });
    });
    
    observer.observe(this, {
      childList: true,
      subtree: false
    });
  }

  private initSwiper() {
    if (!this.swiperContainer || !this.swiperWrapper) return;

    // Check if we have slides before initializing
    const slides = this.swiperWrapper.querySelectorAll('.swiper-slide');
    if (slides.length === 0) {
      console.warn('No slides found in carousel. Make sure to add slide elements.');
      return;
    }

    console.log('Initializing Swiper with:', {
      hasContainer: !!this.swiperContainer,
      hasWrapper: !!this.swiperWrapper,
      hasButtonNext: !!this.buttonNext,
      hasButtonPrev: !!this.buttonPrev,
      hasPagination: !!this.paginationEl,
      navigationEnabled: this.navigation,
      paginationEnabled: this.pagination
    });

    // Parse breakpoints if provided
    let breakpointsConfig = {};
    if (this.breakpoints) {
      try {
        const parsed = JSON.parse(this.breakpoints);
        breakpointsConfig = Object.entries(parsed).reduce((acc, [key, value]) => {
          acc[Number(key)] = { slidesPerView: value };
          return acc;
        }, {} as Record<number, any>);
      } catch (e) {
        console.warn('Invalid breakpoints JSON:', this.breakpoints);
      }
    }

    const config: any = {
      modules: [Navigation, Pagination, A11y, Keyboard, Autoplay],
      slidesPerView: this.slidesPerView,
      spaceBetween: this.spaceBetween,
      loop: this.loop,
      keyboard: this.keyboard ? {
        enabled: true,
        onlyInViewport: true,
      } : false,
      a11y: {
        enabled: true,
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}',
      },
      on: {
        init: (swiper: Swiper) => {
          this.syncPagination(swiper);
        },
        slideChange: (swiper: Swiper) => {
          this.syncPagination(swiper);
          this.dispatchEvent(
            new CustomEvent('slideChange', {
              detail: {
                activeIndex: swiper.realIndex,
                previousIndex: swiper.previousIndex,
              },
              bubbles: true,
              composed: true,
            })
          );
        },
        transitionEnd: (swiper: Swiper) => {
          this.syncPagination(swiper);
        },
        touchEnd: (swiper: Swiper) => {
          this.syncPagination(swiper);
        },
      },
    };

    if (this.navigation && this.buttonNext && this.buttonPrev) {
      config.navigation = {
        nextEl: this.buttonNext,
        prevEl: this.buttonPrev,
      };
    }

    if (this.pagination && this.paginationEl) {
      config.pagination = {
        el: this.paginationEl,
        clickable: true,
        type: 'bullets',
      };
    }

    if (this.autoplay > 0) {
      config.autoplay = {
        delay: this.autoplay,
        disableOnInteraction: false,
      };
    }

    if (Object.keys(breakpointsConfig).length > 0) {
      config.breakpoints = breakpointsConfig;
    }

    this.swiper = new Swiper(this.swiperContainer, config);
    this.syncPagination(this.swiper);

    console.log('Swiper initialized:', {
      slides: this.swiper.slides.length,
      activeIndex: this.swiper.activeIndex,
      navigation: !!config.navigation,
      navigationElements: { next: !!this.buttonNext, prev: !!this.buttonPrev },
      pagination: !!config.pagination,
      paginationElement: !!this.paginationEl
    });

    // Set ARIA attributes
    this.setAttribute('role', 'region');
    this.setAttribute('aria-label', 'Carousel');
    this.setAttribute('aria-roledescription', 'carousel');
  }

  private destroySwiper() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }

  /**
   * Navigate to the next slide
   */
  public next() {
    this.swiper?.slideNext();
  }

  /**
   * Navigate to the previous slide
   */
  public prev() {
    this.swiper?.slidePrev();
  }

  /**
   * Navigate to a specific slide
   * @param index - The slide index to navigate to
   */
  public slideTo(index: number) {
    this.swiper?.slideTo(index);
  }

  /**
   * Get the current active slide index
   */
  public get activeIndex(): number {
    return this.swiper?.realIndex ?? 0;
  }

  render() {
    return html`
      <div class="swiper" part="container">
        <div class="swiper-wrapper" part="wrapper" role="list">
          <!-- Children will be moved here programmatically -->
        </div>
        ${this.navigation
          ? html`
              <div class="swiper-button-prev" part="button-prev" aria-label="Previous slide"></div>
              <div class="swiper-button-next" part="button-next" aria-label="Next slide"></div>
            `
          : ''}
        ${this.pagination
          ? html`<div class="swiper-pagination" part="pagination" role="group" aria-label="Slide navigation"></div>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swiper-carousel': SwiperCarousel;
  }
}
