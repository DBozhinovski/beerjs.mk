import { Select, createOptions } from '@thisbeyond/solid-select';
import '@thisbeyond/solid-select/style.css';
import './Search.css';
import { Show, createSignal } from 'solid-js';
import { createAutoAnimate } from '@formkit/auto-animate/solid';

interface SearchProps {
  options: {
    name: string;
    description?: string;
    url: string;
    homepage?: string;
    geoJSON?: {
      type: string;
      properties: {
        location: string;
      };
      geometry: {
        type: string;
        coordinates: [number, number];
      };
    };
  }[];
}

export const Search = (props: SearchProps) => {
  const [animationParent] = createAutoAnimate();
  const [selected, setSelected] = createSignal<string | null>(null);

  const fullRecord = () => {
    return props.options.find((option) => {
      if (option.geoJSON) {
        return option.geoJSON.properties.location === selected();
      }

      return option.name === selected();
    });
  };

  const searchProps = createOptions(
    props.options.map((option) => {
      if (option.geoJSON) {
        return option.geoJSON.properties.location;
      }

      return option.name;
    }),
  );

  const pickRandom = () => {
    const random = Math.floor(Math.random() * searchProps.options().length);
    setSelected(searchProps.options()[random].label);
  };

  return (
    <div class="w-full flex flex-col lg:flex-row h-full items-center justify-center">
      <div class="w-full mb-20 lg:mb-0 lg:w-1/2 flex flex-col items-center justify-center">
        <div class="w-full flex flex-col items-center justify-center p-4">
          <h1 class="text-bwhite text-2xl font-normal mb-12 font-jetbrains text-center">
            <span id="beerjs-text" class="font-extrabold tracking-tighter text-[80px] text-byellow uppercase ">
              BeerJS
            </span>{' '}
            <br /> branch locator
          </h1>
          <p class="font-jetbrains text-center text-bwhite pb-[26px] text-[18px] max-w-[500px]">
            Search for a city name to find a BeerJS branch near you. If you can't find one, how about{' '}
            <a href="/starter-kit" class="font-bold underline hover:text-byellow transition">
              starting one yourself
            </a>
            ?
          </p>
          <div class="w-full max-w-[500px] mb-[26px]">
            <Select
              placeholder="🔎 Find a meetup..."
              initialValue={selected()}
              {...searchProps}
              onChange={(selected: string) => {
                setSelected(selected);
              }}
            />
          </div>
          <button class="font-jetbrains text-byellow" onClick={pickRandom}>
            I'm feeling lucky 😎
          </button>
        </div>
      </div>
      <div
        class="w-full mb-20 lg:mb-0 lg:w-1/2 h-full lg:min-h-[700px] flex flex-col items-center justify-center p-4 transition"
        ref={animationParent}
      >
        <Show when={selected()} keyed>
          <div
            id="location-card"
            class="bg-bwhite max-w-[500px] p-[36px] md:p-[72px] border border-solid border-1 border-bblack font-jetbrains"
            ref={animationParent}
          >
            <h1 class="capitalize text-bblack text-[24px] lg:text-[32px] font-extrabold mb-[24px]">
              {fullRecord()?.geoJSON?.properties.location || fullRecord()?.name}
            </h1>
            {fullRecord()?.description && (
              <>
                <h2 class="font-semibold text-[18px] mb-1">Description: </h2>
                <p class="bg-[#f1f1f1] p-[12px] font-inter text-[16px] mb-[24px]">{fullRecord()?.description}</p>
              </>
            )}
            <ul>
              <li>
                <span>GH repo:</span> <br />
                <a class="font-bold underline" href={fullRecord()?.url}>
                  {fullRecord()?.url}
                </a>
              </li>
              {fullRecord()?.homepage && (
                <li>
                  Homepage: <br />
                  <a class="font-bold underline" href={fullRecord()?.homepage}>
                    {fullRecord()?.homepage}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </Show>
        <Show when={!selected()}>
          <img src="/map-placeholder.svg" alt="BeerJS logo" />
        </Show>
      </div>
    </div>
  );
};
