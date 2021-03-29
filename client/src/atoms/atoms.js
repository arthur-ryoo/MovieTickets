import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const userAtom = atom({
  key: 'user',
  default: {
    id: 0,
    role: '',
    isLoggined: false,
  },
  effects_UNSTABLE: [persistAtom],
});
