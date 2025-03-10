import { ReactFlowProvider } from 'reactflow'
import './App.scss'
import CodeEditor from './components/code/CodeEditor'
import Nodes from './components/nodes/Nodes'
import { useEffect, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import DockLayout, { DropDirection, LayoutBase } from 'rc-dock'
// light theme and custom file must go together, because dark theme remains unchanged 
import 'rc-dock/dist/rc-dock.css';
import './rc-dock-custom.scss'
// @TODO: dynamically choose (import) theme
// import 'rc-dock/dist/rc-dock-dark.css';
import { defaultLayout } from './layouts/defaultLayout'
import { useLayoutStore } from './store/LayoutStore'
import { usePreferencesStore } from './store/PreferencesStore'
import { setupMenuEventHandler } from './menuHandler'
import { dockHasTabById } from './utils/dockUtils'
import { applyPreferencesLayout } from './layouts/preferencesWindowLayout'

const App = () => {
    const dockLayoutRef = useRef(null)
    function onLayoutChange(newLayout: LayoutBase, currentTabId?: string, direction?: DropDirection) {
        // preferences
        if (currentTabId == 'preferences' && direction == 'remove') {
            usePreferencesStore.getState().closePreferences()
        }
    }
    useEffect(() => {
        const dock: DockLayout = dockLayoutRef.current!
        useLayoutStore.getState().setLayout(dock.getLayout()) // put the default layout to the store when it is loaded
        // menu event handler
        setupMenuEventHandler()
        // layout store listener
        useLayoutStore.subscribe(state => {
            if (state.currentLayout) {
                dock.setLayout(state.currentLayout)
                dock.loadLayout(dock.getLayout())
            }
        })
        // preferences store listener
        usePreferencesStore.subscribe(state => {
            const isPreferencesTabDisplayed = dockHasTabById(dock.getLayout(), 'preferences', true)
            console.log(isPreferencesTabDisplayed)
            if (state.isPreferencesOpened && !isPreferencesTabDisplayed) {
                dock.setLayout(applyPreferencesLayout(dock.getLayout()))
                dock.loadLayout(dock.getLayout())
            }
        })

        return () => {}
    },
        []
    )
    return (
        <ReactFlowProvider>
            <DockLayout
                ref={dockLayoutRef}
                defaultLayout={defaultLayout}
                onLayoutChange={onLayoutChange}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                }}
            />
            <ToastContainer />
        </ReactFlowProvider>
    )
}

export default App
