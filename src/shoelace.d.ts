// import "solid-js";

// declare module "solid-js" {
//   namespace JSX {
//     interface IntrinsicElements {
//       "sl-button": any;
//     }
//   }
// }

import 'solid-js';
import type { Component } from 'solid-js';

declare module 'solid-js' {
  namespace JSX {
    type ElementProps<T> = {
      [K in keyof T]: T[K] extends Component<infer P> ? P : never;
    };

    interface IntrinsicElements extends ElementProps<HTMLElementTagNameMap> {
      'sl-drawer': any;
      'sl-card': any;
      'sl-carousel': any;
      'sl-carousel-item': any;
    }
  }
}

// declare module 'solid-js' {
//   namespace JSX {
//     type ElementProps<T> = {
//       // Add both the element's prefixed properties and the attributes
//       [K in keyof T]: Props<T[K]> & HTMLAttributes<T[K]>;
//     }
//     // Prefixes all properties with `prop:` to match Solid's property setting syntax
//     type Props<T> = {
//       [K in keyof T as `prop:${string & K}`]?: T[K];
//     }
//     interface IntrinsicElements extends ElementProps<HTMLElementTagNameMap> {
//       'sl-button': any
//     }
//   }
// }
