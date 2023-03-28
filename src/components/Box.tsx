import { Icon } from '@iconify-icon/solid';
import './Box.css';

interface BoxProps {
  title: string;
  background: string;
  link: string;
  description: string;
  cta: string;
}

export const Box = (props: BoxProps) => {
  return (
    <a href={props.link}>
      <sl-card
        style={{
          background: ['linear-gradient(#262022e1, #262022e1)', `url("${props.background}") no-repeat center center`],
          'background-size': 'cover',
        }}
        class="fp-box relative elevation-3"
      >
        <img src="/img/foam.png" class="absolute top-0 left-0 opacity-0 transition-opacity" />
        <div class="flex flex-col items-center justify-center relative">
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          <button>
            [{props.cta}
            <span>&nbsp; ➜</span>]
          </button>
        </div>
      </sl-card>
    </a>
  );
};
