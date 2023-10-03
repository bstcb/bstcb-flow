import { useCallback, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import './inputNode.scss';

type Variable = {
  name: string;
  value: string;
};

type InputNodeProps = {
  label: string;
  value: string;
};

const InputNode = ({ data: props }: NodeProps<InputNodeProps>) => {
  const onChangeName = useCallback((evt: any) => {
    console.log(evt.target.value);
    SetCurrentVariable({
      name: evt.target.value,
      value: currentVariable.value,
    });
  }, []);
  const onChangeValue = useCallback((evt: any) => {
    console.log(evt.target.value);
    SetCurrentVariable({
      name: currentVariable.name,
      value: evt.target.value,
    });
  }, []);

  const variableFromValue = (v: string): Variable => {
    return {
      name: v.split('=')[0],
      value: v.split('=')[1],
    };
  };
  console.log(props);
  const [currentVariable, SetCurrentVariable] = useState<Variable>(
    variableFromValue(props.value),
  );
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="_input_wrapper">
        <label htmlFor="_input_text_name">Name</label>
        <input
          id="_input_variable_name"
          name="_input_text_name"
          onChange={onChangeName}
          value={`${currentVariable.name}`}
        />
        <label htmlFor="_input_text_value">Value</label>
        <input
          id="_input_variable_value"
          name="_input_text_value"
          onChange={onChangeValue}
          value={`${currentVariable.value}`}
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default InputNode;
