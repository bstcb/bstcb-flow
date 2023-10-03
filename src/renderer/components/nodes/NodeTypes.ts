import { NodeProps } from 'reactflow';
import InputNode from './custom/input/InputNode';

export const nodeTypes = {
  Iinput: InputNode,
};

export type CustomNode = ({ data, isConnectable }: NodeProps) => JSX.Element;
