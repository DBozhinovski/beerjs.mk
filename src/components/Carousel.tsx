import { For } from 'solid-js';

import '@shoelace-style/shoelace/dist/components/carousel/carousel';
import '@shoelace-style/shoelace/dist/components/carousel-item/carousel-item';

import './Carousel.css';

interface Carousel {
  slides: string[];
  navigation?: boolean;
  slidesPerPage?: number;
  slidesPerMove?: number;
  loop?: boolean;
  pagination?: boolean;
  autoplay?: boolean;
}

export const Carousel = (props: Carousel) => {
  return (
    <div>
      <sl-carousel pagination navigation mouse-dragging loop class="carousel">
        {props.slides.map((slide) => (
          <sl-carousel-item>
            <div innerHTML={slide}></div>
          </sl-carousel-item>
        ))}
      </sl-carousel>
    </div>
  );
};
