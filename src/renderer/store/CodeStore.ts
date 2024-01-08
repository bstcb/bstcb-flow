import { create } from 'zustand'

type State = {
  activeLanguage: string
  setActiveLanguage: (al: string) => void
}

const INITIAL_LANGUAGE = 'javascript'

export const useCodeStore = create<State>(set => ({
  activeLanguage: INITIAL_LANGUAGE,
  setActiveLanguage: (al: string) => {
    set(() => ({ activeLanguage: al }))
    console.log('[STORE]: active langugage updated:', al)
  },
}))
