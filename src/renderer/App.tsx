import { ReactFlowProvider } from 'reactflow'
import './App.scss'
import CodeEditor from './components/code/CodeEditor'
import Nodes from './components/nodes/Nodes'
import { useEffect, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import DockLayout from 'rc-dock'
// light theme and custom file must go together, because dark theme remains unchanged 
import 'rc-dock/dist/rc-dock.css';
import './rc-dock-custom.scss'
// @TODO: dynamically choose (import) theme
// import 'rc-dock/dist/rc-dock-dark.css';
import { defaultLayout } from './layouts/defaultLayout'
import { useLayoutStore } from './store/LayoutStore'

const App = () => {
    const dockLayoutRef = useRef(null)
    useEffect(() => {
        const dock: DockLayout = dockLayoutRef.current!
        useLayoutStore.subscribe(state => {
            if (state.currentLayout)
                dock.setLayout(state.currentLayout)
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
