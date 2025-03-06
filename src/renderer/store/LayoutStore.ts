import DockLayout, { LayoutData } from "rc-dock"
import { createStore } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import { defaultLayout } from "../layouts/defaultLayout"

type State = {
    RCDockInstance?: DockLayout // instance of <DockLayout/> component
    currentLayout?: LayoutData   // actual docks layout
}

type Actions = {
    setRCDockInstance: (di: DockLayout) => void // instance setter
    setLayout: (dl: LayoutData) => void         // layout setter
    saveLayout: (layout: LayoutData) => void
    loadLayout: (layout: LayoutData) => void
    restoreDefaultLayout: () => void
}

type Store = State & Actions

export const useLayoutStore = createStore<Store>()(
    subscribeWithSelector((set) => ({
        currentLayout: null,

        setLayout: (state, dl: LayoutData) => {
            set(() => ({ currentLayout: dl }))
            console.log('[LAYOUT STORE]: currentLayout set')
            console.log(dl)
        }

    }))
)
