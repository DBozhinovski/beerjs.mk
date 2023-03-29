import { Icon } from '@iconify-icon/solid';
import { useStore } from '@nanostores/solid';
import { createEffect, createSignal, For } from 'solid-js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer';

import { languageState } from '../data/store';
import { locales } from '../data/translations';
import { LanguageSwitch } from './LanguageSwitch';

import './Drawer.css';

interface NavItem {
  id: 'home' | 'videos' | 'blog' | 'events' | 'about' | 'contact';
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    href: '/',
    icon: 'ri:home-fill',
  },
  {
    id: 'videos',
    href: '/videos',
    icon: 'ri:video-fill',
  },
  {
    id: 'blog',
    href: '/blog',
    icon: 'ri:file-text-fill',
  },
  {
    id: 'events',
    href: '/events',
    icon: 'ri:calendar-fill',
  },
  {
    id: 'about',
    href: '/about',
    icon: 'ri:group-2-fill',
  },
  {
    id: 'contact',
    href: '/contact',
    icon: 'ri:mail-fill',
  },
];

const [navSignal] = createSignal(navItems);

export const Header = () => {
  const lang = useStore(languageState);

  createEffect(() => {
    const headerEl = document.querySelector('#header');
    const sentinelEl = document.querySelector('#sentinel');

    const handler = (entries: any) => {
      // entries is an array of observed dom nodes
      // we're only interested in the first one at [0]
      // because that's our .sentinal node.
      // Here observe whether or not that node is in the viewport
      if (headerEl && !entries[0].isIntersecting) {
        headerEl.classList.add('bg-[#262022]', 'elevation-5');
      } else {
        headerEl?.classList.remove('bg-[#262022]', 'elevation-5');
      }
    };

    // create the observer
    const observer = new window.IntersectionObserver(handler);
    // give the observer some dom nodes to keep an eye on
    if (sentinelEl) {
      observer.observe(sentinelEl);
    }
  });

  return (
    <>
      <div id="sentinel" class="w-0 h-0" />
      <header
        class="sticky top-0 flex z-[55] w-full items-center justify-between py-2 px-2 transition-colors"
        id="header"
      >
        <nav class="flex lg:hidden">
          <button
            class="w-[48px] h-[48px] bg-primary-100 rounded-lg items-center justify-center flex font-slab-serif"
            onclick={() => document.querySelector('#drawer').show()}
          >
            <Icon icon="ion:beer" width="36px" style={{ color: '#322c0c' }} />
          </button>
          <sl-drawer placement="start" id="drawer" no-header>
            <div class="flex w-full justify-between">
              <a href="/">
                <Icon icon="ion:beer" width="36px" style={{ color: '#322c0c' }} />
              </a>
              <button class="cursor-pointer" onclick={() => document.querySelector('#drawer').hide()}>
                <Icon icon="ion:close" width="36px" style={{ color: '#322c0c' }} />
              </button>
            </div>
            <div class="flex flex-col pt-12">
              <For each={navSignal()}>
                {(item, i) => (
                  <a
                    href={item.href}
                    class="hover:bg-[#262022] hover:text-primary-500 transition-colors py-4 px-4 flex items-center mr-4 mb-2 text-3xl last:mr-0"
                  >
                    <Icon icon={item.icon} class="mr-1" />{' '}
                    <p class="h-full flex items-center justify-center">{locales[lang()][item.id]}</p>
                  </a>
                )}
              </For>
            </div>
          </sl-drawer>
        </nav>
        <nav class="hidden lg:flex px-2 rounded-lg font-slab-serif text-primary-500">
          <For each={navSignal()}>
            {(item, i) => (
              <a
                href={item.href}
                class="hover:bg-primary-50 hover:text-secondary-900 transition-colors py-2 px-2 flex items-center justify-center mr-4 text-xl last:mr-0"
              >
                <Icon icon={item.icon} class="mr-1" />{' '}
                <p class="h-full flex items-center justify-center">{locales[lang()][item.id]}</p>
              </a>
            )}
          </For>
        </nav>
        <LanguageSwitch />
      </header>
    </>
  );
};
