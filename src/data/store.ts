import { atom } from 'nanostores';
import { regionist } from 'regionist';

export type language = 'mk' | 'en';

let lang = localStorage.getItem('language');

if (!lang) {
  const res = regionist.guess();
  if (res.preferredLanguage !== 'mk') {
    lang = 'en';
  }
}

export const languageState = atom<language>(lang as language);

languageState.listen((val) => {
  localStorage.setItem('language', val);
});
