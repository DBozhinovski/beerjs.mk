import type { JSX } from 'solid-js';
import LogoImage from '../assets/beerjs.skopje.svg';

interface LogoProps extends JSX.HTMLAttributes<HTMLImageElement> {}

export const Logo = (props: LogoProps) => {
  return <img {...props} src={LogoImage} />;
};
