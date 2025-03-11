import { ReactFlowProvider } from 'reactflow'
import CodeEditor from './components/code/CodeEditor'
import Nodes from './components/nodes/Nodes'
import { useEffect, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import DockLayout, { DropDirection, FloatPosition, LayoutBase } from 'rc-dock'
import { useLayoutStore } from './store/LayoutStore'
import { usePreferencesStore } from './store/PreferencesStore'
import { setupMenuEventHandler } from './menuHandler'
import { preferencesPanel } from './docks/preferencesPanel'
import { defaultLayout } from './docks/defaultLayout'
import { Preferences } from './components/preferences/preferences'

import './App.scss'

// import 'rc-dock/dist/rc-dock-dark.css';
import 'rc-dock/dist/rc-dock.css';
import './rc-dock-custom.scss'


// @TODO: implement
function changeTheme(theme: Pick<Preferences, 'preferences.appearance.colorTheme'>) {
    if (theme == 'dark') {
    } else {

    }
}

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
        // @TODO: optimize
        // we don't need to watch all preferences here
        usePreferencesStore.subscribe(state => {
            // watch theme
            changeTheme(state.preferences['preferences.appearance.colorTheme'])

            const isPreferencesTabDisplayed = dock.find('preferences')
            // display preferences
            if (state.isPreferencesOpened && !isPreferencesTabDisplayed) {
                dock.dockMove(preferencesPanel, null, 'float')
            }
            // close preferences
            if (!state.isPreferencesOpened && isPreferencesTabDisplayed) {
                dock.dockMove(preferencesPanel, null, 'remove')
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
