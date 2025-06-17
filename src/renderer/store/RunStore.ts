import { createStore } from 'zustand/vanilla'
import { subscribeWithSelector } from 'zustand/middleware'

type State = {
  runResult: string
}

type Actions = {
  setRunResult: (rr: string) => void
}

type Store = State & Actions

export const useRunStore = createStore<Store>()(
  subscribeWithSelector((set) => ({
    runResult: '',

    setRunResult: (rr: string) => {
      set((state) => ({ runResult: rr }))
      console.log('[STORE]: run result set')
    },
  })),
)
