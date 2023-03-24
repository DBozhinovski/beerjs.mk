import { useStore } from '@nanostores/solid';
import { languageState } from '../data/store';

export const LanguageSwitch = () => {
  const lang = useStore(languageState);

  return (
    <nav class="px-2 py-2 bg-base-300 rounded-lg items-center justify-center flex font-slab-serif">
      <button
        onClick={() => languageState.set('mk')}
        class={`px-2 py-1 ${lang() === 'mk' && 'bg-primary-100 rounded shadow'}`}
      >
        MK
      </button>
      <button
        onClick={() => languageState.set('en')}
        class={`px-2 py-1 ${lang() === 'en' && 'bg-primary-100 rounded shadow'}`}
      >
        EN
      </button>
    </nav>
  );
};
