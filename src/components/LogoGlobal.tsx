import type { JSX } from 'solid-js';
import LogoImage from '../assets/beerjs.svg';

interface LogoProps extends JSX.HTMLAttributes<HTMLImageElement> {}

export const LogoGlobal = (props: LogoProps) => {
  console.log(LogoImage);

  return <img {...props} src={LogoImage} />;
};
