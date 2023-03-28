import { Icon } from '@iconify-icon/solid';
import { format } from 'date-fns';
import '@shoelace-style/shoelace/dist/components/card/card';

import './BigCard.css';

interface Props {
  image: string;
  title: string;
  description: string;
  href: string;
  date: Date;
}

export const BigCard = (props: Props) => {
  return (
    <sl-card class="big-card">
      <img slot="image" src={props.image} />
      <div class="prose:lg lg:prose-xl">
        <h2>{props.title}</h2>
        <h5 class="flex items-center">
          <Icon icon="ri:calendar-fill" class="mr-2" /> {format(props.date, 'yyyy-MM-dd')}
        </h5>
        <p>{props.description}</p>
      </div>
      <div class="mt-6 lg:mt-28 flex h-full">
        <a href={props.href} class="ml-auto">
          <button class="bg-base-900 hover:bg-primary-500 rounded-full p-2 h-[60px] w-[60px] text-primary-500 hover:text-base-900 transition-colors flex items-center justify-center">
            <Icon icon="material-symbols:arrow-right-alt-rounded" width="40px" />
          </button>
        </a>
      </div>
    </sl-card>
  );
};
