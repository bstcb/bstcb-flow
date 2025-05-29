import { LayoutData } from 'rc-dock'
import Nodes from '../components/nodes/Nodes'
import CodeEditor from '../components/code/CodeEditor'
import CompilerWindow from '../components/CompilerWindow/CompilerWindow'
import i18n from '../../../i18config'

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
                title: i18n.t('DOCK_NODE_EDITOR'),
                content: <Nodes />,
                closable: false,
              },
            ],
          },
        ],
      },
      {
        mode: 'vertical',
        size: 50,
        children: [
          {
            tabs: [
              {
                id: 'codeEditor',
                title: i18n.t('DOCK_CODE_EDITOR'),
                content: <CodeEditor />,
                closable: false,
              },
            ],
          },
          {
            mode: 'horizontal',
            size: 50,
            children: [
              {
                tabs: [
                  {
                    id: 'compilerWindow',
                    title: i18n.t('DOCK_COMPILER_WINDOW'),
                    content: <CompilerWindow />,
                    closable: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}
