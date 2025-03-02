import { LayoutData } from "rc-dock";
import CodeEditor from "./components/code/CodeEditor";
import Nodes from "./components/nodes/Nodes";

export const defaultLayout: LayoutData = {
    dockbox: {
        mode: 'horizontal',
        children: [
            {
                mode: 'vertical',
                size: 50,
                children: [
                    {
                        tabs: [
                            {
                                id: 'nodes',
                                title: 'node editor',
                                content: <Nodes />,
                                closable: false
                            }
                        ]
                    }
                ]
            },
            {
                mode: 'vertical',
                size: 50,
                children: [
                    {
                        tabs: [
                            {
                                id: 'codeEditor',
                                title: 'code editor',
                                content: <CodeEditor />,
                                closable: false
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
