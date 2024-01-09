import { create } from 'zustand'

type State = {
  codeChunks: string[]
  activeLanguage: string
  setActiveLanguage: (al: string) => void
  setCodeChunks: (cc: string[]) => void
}

const INITIAL_LANGUAGE = 'javascript'

export const useCodeStore = create<State>(set => ({
  activeLanguage: INITIAL_LANGUAGE,
  codeChunks: [],

  setActiveLanguage: (al: string) => {
    set(() => ({ activeLanguage: al }))
    console.log('[STORE]: active langugage updated:', al)
  },
  setCodeChunks: (cc: string[]) => {
    set(() => ({ codeChunks: cc }))
    console.log('[STORE]: code chunks updated:', cc)
  },
}))
