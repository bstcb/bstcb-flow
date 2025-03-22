import { createStore } from 'zustand/vanilla'
import { CodeError } from '../types/codeError'
import { subscribeWithSelector } from 'zustand/middleware'

const INITIAL_LANGUAGE = 'javascript'

type State = {
  code: string
  activeLanguage: string
  codeError?: CodeError
}

type Actions = {
  setCodeError: (ce: CodeError) => void
  clearCodeError: () => void
  setActiveLanguage: (al: string) => void
  setCode: (c: string) => void
  clearCode: () => void
}

type Store = State & Actions

export const useCodeStore = createStore<Store>()(
  subscribeWithSelector((set) => ({
    activeLanguage: INITIAL_LANGUAGE,
    code: '',
    codeError: null,

    clearCodeError: () => {
      set((state) => ({ codeError: null }))
      console.log('[STORE]: code error cleared')
    },

    setCodeError: (ce: CodeError) => {
      set((state) => ({ codeError: ce }))
      console.log('[STORE]: code error updated:', ce)
    },

    setActiveLanguage: (al: string) => {
      set((state) => ({ activeLanguage: al }))
      console.log('[STORE]: active language updated:', al)
    },

    setCode: (c: string) => {
      set((state) => ({ code: c }))
      console.log('[STORE]: code updated:', c)
    },

    clearCode: () => {
      set((state) => ({ code: '' }))
      console.log('[STORE]: code cleared')
    },
  }))
)
