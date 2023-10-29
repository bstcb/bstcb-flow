import { useCallback } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { DefaultNodeProps } from '../../../../../types/defaultNodeProps';
import './IfConditionNode.scss';

interface IfConditionNodeProps extends DefaultNodeProps {}

const IfConditionNode = (props: NodeProps<IfConditionNodeProps>) => {
  const onChange = useCallback((e: any) => {}, []);
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Left} />
      <div className="_if_cond_wrapper">
        <input
          type="text"
          className="_if_cond_input"
          id="_if_cond_value"
          value={props.data.value}
          onChange={onChange}
        />
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default IfConditionNode;
