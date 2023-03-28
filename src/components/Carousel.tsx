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
      <sl-carousel
        navigation={props.navigation}
        pagination={props.pagination}
        slides-per-page={props.slidesPerPage}
        slides-per-move={props.slidesPerMove}
        loop={props.loop}
        autoplay={props.autoplay}
        class="carousel"
      >
        <For each={props.slides}>
          {(slide) => {
            return <sl-carousel-item innerHTML={slide}></sl-carousel-item>;
          }}
        </For>
      </sl-carousel>
    </div>
  );
};
