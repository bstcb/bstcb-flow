import { ReactFlow } from 'reactflow';
import './Nodes.scss';

import 'reactflow/dist/style.css';

const Nodes = () => {
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  return (
    <div className="nodes">
      <div className="nodes__wrapper">
        <ReactFlow nodes={initialNodes} edges={initialEdges} />
      </div>
    </div>
  );
};

export default Nodes;
