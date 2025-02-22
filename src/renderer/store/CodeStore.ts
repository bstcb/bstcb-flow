import { create } from 'zustand'
import { CodeError } from '../types/codeError'

type State = {
  codeChunks: string[]
  activeLanguage: string
  codeError?: CodeError
  setCodeError: (ce: CodeError) => void
  clearCodeError: () => void
  setActiveLanguage: (al: string) => void
  setCodeChunks: (cc: string[]) => void
  clearCodeChunks: () => void
}

const INITIAL_LANGUAGE = 'javascript'

export const useCodeStore = create<State>(set => ({
  activeLanguage: INITIAL_LANGUAGE,
  codeChunks: [],
  codeError: null,
  
  clearCodeError: () => {
    set(() => ({ codeError: null }))
    console.log('[STORE]: code error updated:', ce)
  },

  setCodeError: (ce: CodeError) => {
    set(() => ({ codeEditor: ce }))
    console.log('[STORE]: code error updated:', ce)
  },

  setActiveLanguage: (al: string) => {
    set(() => ({ activeLanguage: al }))
    console.log('[STORE]: active langugage updated:', al)
  },

  setCodeChunks: (cc: string[]) => {
    set(() => ({ codeChunks: cc }))
    console.log('[STORE]: code chunks updated:', cc)
  },

  clearCodeChunks: () => {
    set(() => ({ codeChunks: [] }))
    console.log('[STORE]: code chunks cleared')
  },
}))
