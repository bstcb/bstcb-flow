import { createStore } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type State = {
  isSettingsOpened: boolean
}

type Actions = {
  openSettings: () => void
  closeSettings: () => void
}

type Store = State & Actions

export const useSettingsStore = createStore<Store>()(
  subscribeWithSelector((set) => ({
    isSettingsOpened: false,

    openSettings: () => {
      set(() => ({ isSettingsOpened: true }))
      console.log('[SETTINGS STORE]: SETTINGS opened')
    },
    closeSettings: () => {
      set(() => ({ isSettingsOpened: false }))
      console.log('[SETTINGS STORE]: SETTINGS closed')
    },
  })),
)
