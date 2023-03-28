import { useStore } from '@nanostores/solid';
import { Show } from 'solid-js';
import { languageState } from '../data/store';

export const ContentSwitch = (props: any) => {
  const lang = useStore(languageState);

  return (
    <div class="relative w-full h-full">
      <Show when={lang() === 'mk'}>{props.contentsMk}</Show>
      <Show when={lang() === 'en'}>{props.contentsEn}</Show>
    </div>
  );
};
