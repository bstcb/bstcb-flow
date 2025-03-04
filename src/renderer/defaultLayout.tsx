import { LayoutData } from "rc-dock";
import CodeEditor from "./components/code/CodeEditor";
import Nodes from "./components/nodes/Nodes";
import CompilerWindow from "./components/CompilerWindow";

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
                    },
                    {
                        mode: 'horizontal',
                        size: 120,
                        children: [
                            {
                                tabs: [
                                    {
                                        id: 'compilerWindow',
                                        title: 'compiler window',
                                        content: <CompilerWindow />,
                                        closable: false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
