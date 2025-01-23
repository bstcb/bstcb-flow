import { create } from 'zustand'

type State = {
  // general field to check error existence
  isError: boolean
  // data format error
  isNodeDataFormatError: string
  setIsNodeDataFormatError: (ne: string) => void
  // attempt to delete initial node error
  isDeleteNodeError: boolean
  setIsDeleteNodeError: (ne: boolean) => void
  // reset state
  clearErrors: () => void
}

export const useErrorStore = create<State>(set => ({
  isDeleteNodeError: false,
  isNodeDataFormatError: '',
  isError: false,
  setIsDeleteNodeError: (ne: boolean) => {
    set(() => ({ isDeleteNodeError: ne, isError: true }))
    console.log('[STORE]: node error toast updated: ', ne)
  },
  setIsNodeDataFormatError: (ne: string) => {
    set(() => ({ isNodeDataFormatError: ne, isError: true }))
    console.log('[STORE]: node error toast updated: ', ne)
  },
  clearErrors: () => {
    set(() => ({
      isNodeDataFormatError: '',
      isError: false,
      isDeleteNodeError: false,
    }))
    console.log('[STORE]: node error store cleared: ', useErrorStore.getState())
  },
}))
