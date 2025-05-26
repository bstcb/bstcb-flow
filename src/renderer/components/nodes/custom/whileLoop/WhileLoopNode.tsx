import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import './WhileLoopNode.scss';
import { DefaultNodeProps } from '../../../../types/defaultNodeProps';
import { NodeTokenKind } from '../../../../../transpilers/Token';
import { VariableParser } from '../../../../../transpilers/VariableParser';
import { Variable } from '../../../../types/variable';
import { ErrorKind } from '../../../../errors/ErrorReporter';

interface WhileLoopNodeProps extends DefaultNodeProps {}

const WhileLoopNode = ({ data: props }: NodeProps<WhileLoopNodeProps>) => {
  const { setNodes, getNodes, getNode } = useReactFlow();

  const node = getNode(props.id);
  const nodes = getNodes();
  const nodeIndex = nodes.indexOf(nodes.find((n) => n.id == props.id))!;

  const inputRef: MutableRefObject<HTMLInputElement> = useRef(null);

  const [currentVariable, SetCurrentVariable] = useState<Variable>(
    VariableParser.parse(props.value, NodeTokenKind.NTK_WHILE_LOOP),
  );

  const onChange = useCallback((e: any) => {
    const value: string = e.target.value;
    if (value == '') {
      ErrorReporter.show(
        node.type,
        nodeIndex,
        ErrorKind.EK_WRONG_DATA_FORMAT,
        'value is empty',
      );
      ErrorReporter.applyErrorStyle(inputRef.current);
    } else {
      ErrorReporter.clearErrorStyle(inputRef.current);
    }
    SetCurrentVariable(
      VariableParser.parse(value, NodeTokenKind.NTK_WHILE_LOOP),
    );
  }, []);

  useEffect(() => {
    console.log(props);
    setNodes((nds) =>
      nds.map((node) => {
        console.log(props);
        console.log(node.id === props.id);
        if (node.id === props.id) {
          console.log('node.data before');
          console.log(node.data);
          console.log(currentVariable);
          console.log('node.data after');
          console.log({
            ...node,
            data: {
              ...node.data,
              value: currentVariable,
            },
          });

          return {
            ...node,
            data: {
              ...node.data,
              value: currentVariable,
            },
          };
        }
        return node;
      }),
    );
    // @TODO: implement update in NodeStore
    console.log('[WhileLoop.tsx]: all nodes');
    console.log(getNodes());
  }, [currentVariable, setNodes]);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ zIndex: 999, transform: 'translate(-3px, -90%)' }}
      />
      <div className="_while_lp_wrapper">
        <input
          ref={inputRef}
          type="text"
          className="_while_lp_input"
          id="_while_lp_value"
          value={currentVariable.value}
          onChange={onChange}
        />
      </div>
      <Handle
        type="source"
        id="h_true"
        position={Position.Left}
        style={{ zIndex: 999, transform: 'translate(-30px, -3px)' }}
      />
      <Handle
        type="source"
        id="h_false"
        position={Position.Right}
        style={{ zIndex: 999, transform: 'translate(30px, -3px)' }}
      />
    </>
  );
};

export default WhileLoopNode;
