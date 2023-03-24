import { Icon } from '@iconify-icon/solid';
import { useStore } from '@nanostores/solid';
import { createSignal, For } from 'solid-js';

import { languageState } from '../data/store';
import { locales } from '../data/translations';

import LogoSkopje from '../assets/beerjs.skopje.svg';
import LogoGlobal from '../assets/beerjs.svg';
import { format } from 'date-fns';

interface NavItem {
  id: 'home' | 'videos' | 'blog' | 'events' | 'about' | 'contact' | 'press-kit' | 'sponsorship';
  href: string;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    href: '/',
  },
  {
    id: 'videos',
    href: '/videos',
  },
  {
    id: 'blog',
    href: '/blog',
  },
  {
    id: 'events',
    href: '/events',
  },
  {
    id: 'about',
    href: '/about',
  },
  {
    id: 'contact',
    href: '/contact',
  },
  {
    id: 'press-kit',
    href: '/press-kit',
  },
  {
    id: 'sponsorship',
    href: '/sponsorship',
  },
];

const [navSignal] = createSignal(navItems);

export const Footer = () => {
  const lang = useStore(languageState);

  return (
    <footer class="bg-[#262022] p-4 flex flex-col items-center w-full" id="footer">
      <div class="flex items-center w-full">
        <div class="flex shrink-0">
          <img src={LogoSkopje} class="w-[120px] mt-4" />
        </div>
        <nav class="flex px-4 rounded-lg font-slab-serif text-primary-500 flex-grow">
          <div class="flex items-center justify-center flex-wrap w-full">
            <For each={navSignal()}>
              {(item, i) => (
                <a href={item.href} class="underline text-lg mr-4 last:mr-0 mb-4">
                  {locales[lang()][item.id]}
                </a>
              )}
            </For>
          </div>
        </nav>
        <div class="flex shrink-0 items-end justify-end">
          <img src={LogoGlobal} class="w-[80px]" />
        </div>
      </div>
      <div class="flex items-center justify-center w-full border-t border-base-700 pt-10">
        <p class="text-lg font-transitional text-primary-600 w-full text-center">
          <a href="https://deved.mk" class="underline">
            DeveD
          </a>{' '}
          | {format(new Date(), 'yyyy')}
        </p>
      </div>
    </footer>
  );
};
