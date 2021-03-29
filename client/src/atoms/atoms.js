import { atom } from 'recoil';

export const userAtom = atom({
  key: 'user',
  default: {
    id: 0,
    role: '',
  },
});
