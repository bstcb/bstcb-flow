import { create } from 'zustand'

type State = {
   isNodeToastError: boolean
   setIsNodeToastError: (nte: boolean) => void
}


export const useStyleStore = create<State>(set => ({
   isNodeToastError: false,
   setIsNodeToastError: (nte: boolean) => {
      set(() => ({ isNodeToastError: nte }))
      console.log('[STORE]: node toast error updated: ', nte)
   },

}))
