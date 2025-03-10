import { createStore } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import { Preferences, preferences } from "../components/preferences/preferences"

type State = {
  isPreferencesOpened: boolean,
  preferences?: Preferences,
}

type Actions = {
  setPreferences: (pref: Preferences) => void
  openPreferences: () => void
  closePreferences: () => void
}

type Store = State & Actions

export const usePreferencesStore = createStore<Store>()(
  subscribeWithSelector((set) => ({
    isPreferencesOpened: false,
    preferences: preferences,

    setPreferences: (pref: Preferences) => {
      set(() => ({ preferences: pref }))
      console.log('[PREFERENCES STORE]: PREFERENCES set')
      console.log(pref)
    },
    openPreferences: () => {
      set(() => ({ isPreferencesOpened: true }))
      console.log('[PREFERENCES STORE]: PREFERENCES opened')
    },
    closePreferences: () => {
      set(() => ({ isPreferencesOpened: false }))
      console.log('[PREFERENCES STORE]: PREFERENCES closed')
    },


  }))
)
