import { ReactFlowProvider } from 'reactflow'
import CodeEditor from './components/code/CodeEditor'
import Nodes from './components/nodes/Nodes'
import { useEffect, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import DockLayout, { DropDirection, FloatPosition, LayoutBase } from 'rc-dock'
import { useLayoutStore } from './store/LayoutStore'
import { setupMenuEventHandler } from './menuHandler'
import { defaultLayout } from './docks/defaultLayout'

import './App.scss'

// import 'rc-dock/dist/rc-dock-dark.css';
import 'rc-dock/dist/rc-dock.css'
import './rc-dock-custom.scss'

import '../../i18config.ts'
import { useSettingsStore } from './store/SettingsStore'
import { settingsPanel } from './docks/settingsPanel'

// @TODO: implement
function changeTheme(
  theme: any, // temporary set to 'any'
) {
  if (theme == 'dark') {
  } else {
  }
}

const App = () => {
  const dockLayoutRef = useRef(null)
  function onLayoutChange(
    newLayout: LayoutBase,
    currentTabId?: string,
    direction?: DropDirection,
  ) {
    // settings
    if (currentTabId == 'settings' && direction == 'remove') {
      useSettingsStore.getState().closeSettings()
    }
  }
  useEffect(() => {
    const dock: DockLayout = dockLayoutRef.current!
    useLayoutStore.getState().setLayout(dock.getLayout()) // put the default layout to the store when it is loaded
    // menu event handler
    setupMenuEventHandler()
    // layout store listener
    useLayoutStore.subscribe((state) => {
      if (state.currentLayout) {
        dock.setLayout(state.currentLayout)
        dock.loadLayout(dock.getLayout())
      }
    })
    // settings store listener
    // @TODO: optimize
    // we don't need to watch all settings here
    useSettingsStore.subscribe((state) => {
      // watch theme
      changeTheme(localStorage.getItem('appearance.colorTheme'))

      const isSettingsTabDisplayed = dock.find('settings')
      // display settings
      if (state.isSettingsOpened && !isSettingsTabDisplayed) {
        dock.dockMove(settingsPanel, null, 'float')
      }
      // close settings
      if (!state.isSettingsOpened && isSettingsTabDisplayed) {
        dock.dockMove(settingsPanel, null, 'remove')
      }
    })

    return () => {}
  }, [])
  return (
    <ReactFlowProvider>
      <DockLayout
        ref={dockLayoutRef}
        defaultLayout={defaultLayout}
        onLayoutChange={onLayoutChange}
        style={{
          position: 'absolute',
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
