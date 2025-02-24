import { createStore } from 'zustand/vanilla'
import { CodeError } from '../types/codeError'
import { subscribeWithSelector } from 'zustand/middleware'

const INITIAL_LANGUAGE = 'javascript'

type State = {
    codeChunks: string[]
    activeLanguage: string
    codeError?: CodeError
}

type Actions = {
    setCodeError: (ce: CodeError) => void
    clearCodeError: () => void
    setActiveLanguage: (al: string) => void
    setCodeChunks: (cc: string[]) => void
    clearCodeChunks: () => void
}

type Store = State & Actions

export const useCodeStore = createStore<Store>()(
    subscribeWithSelector((set) => ({
        activeLanguage: INITIAL_LANGUAGE,
        codeChunks: [],
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

        setCodeChunks: (cc: string[]) => {
            set((state) => ({ codeChunks: cc }))
            console.log('[STORE]: code chunks updated:', cc)
        },

        clearCodeChunks: () => {
            set((state) => ({ codeChunks: [] }))
            console.log('[STORE]: code chunks cleared')
        },
    }))
)
