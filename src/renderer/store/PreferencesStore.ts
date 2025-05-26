import { createStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import {
  preferencesData,
  PreferencesData,
} from '../components/preferences/preferencesData';

type State = {
  isPreferencesOpened: boolean;
  preferences?: PreferencesData;
};

type Actions = {
  setPreferences: (pref: PreferencesData) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

type Store = State & Actions;

export const usePreferencesStore = createStore<Store>()(
  subscribeWithSelector((set) => ({
    isPreferencesOpened: false,
    preferences: preferencesData,

    setPreferences: (pref: PreferencesData) => {
      set(() => ({ preferences: pref }));
      console.log('[PREFERENCES STORE]: PREFERENCES set');
      console.log(pref);
    },
    openPreferences: () => {
      set(() => ({ isPreferencesOpened: true }));
      console.log('[PREFERENCES STORE]: PREFERENCES opened');
    },
    closePreferences: () => {
      set(() => ({ isPreferencesOpened: false }));
      console.log('[PREFERENCES STORE]: PREFERENCES closed');
    },
  })),
);
