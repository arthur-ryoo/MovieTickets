import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const userAtom = atom({
  key: 'user',
  default: {
    id: 0,
    role: '',
    isLoggedIn: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const moviesAtom = atom({
  key: 'movies',
  default: [],
});

export const movieDetailAtom = atom({
  key: 'movieDetail',
  default: [],
});

export const reservationsAtom = atom({
  key: 'reservations',
  default: [],
});

export const reservationDetailAtom = atom({
  key: 'reservationDetail',
  default: [],
});
