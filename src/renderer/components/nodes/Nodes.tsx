import {
  Controls,
  Edge,
  OnConnect,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import './Nodes.scss';

import { useCallback } from 'react';
import 'reactflow/dist/style.css';
import { initialEdges, initialNodes } from './initialNodes';

const Nodes = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  return (
    <div className="nodes">
      <div className="nodes__wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Nodes;
