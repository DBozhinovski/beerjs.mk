import { UAParser } from 'ua-parser-js';

const ua = new UAParser();

export const isOSX = () => {
  return ua.getOS().name === 'Mac OS';
};
