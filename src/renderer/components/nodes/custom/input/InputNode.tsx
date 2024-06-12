import { useCallback, useEffect, useState } from 'react'
import { Handle, NodeProps, Position, applyNodeChanges, useNodes, useNodesState, useReactFlow } from 'reactflow'
// #FIXME: long imports
import { DefaultNodeProps } from '../../../../types/defaultNodeProps'
import './InputNode.scss'
import { Variable } from '../../../../types/variable'
import { variableFromValue } from '../../../../../helpers/helpers'

interface InputNodeProps extends DefaultNodeProps {}

const InputNode = ({ data: props }: NodeProps<InputNodeProps>) => {
  const { getNodes } = useReactFlow()
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(getNodes())
  const [currentVariable, setCurrentVariable] = useState<Variable>(
    variableFromValue(props.value),
  )
  // #DEBUG
  useEffect(() => {
    console.log('[InputNode]: currentVaiable Updated: ')
    console.log(currentVariable)
  }, [currentVariable])

  const onChangeName = (e: any) => {
    const newName = e.target.value;
    setCurrentVariable({ ...currentVariable, name: newName });
  };

  const onChangeValue = (e: any) => {
    const newValue = e.target.value;
    setCurrentVariable({ ...currentVariable, value: newValue });
  };


  return (
    <>
      <Handle type='target' position={Position.Top} />
      <div className='_input_wrapper'>
        <input
          id='_input_variable_name'
          name='_input_text_name'
          onChange={onChangeName}
          value={`${currentVariable.name}`}
        />
        <span>=</span>
        <input
          id='_input_variable_value'
          name='_input_text_value'
          onChange={onChangeValue}
          value={`${currentVariable.value}`}
        />
      </div>
      <Handle type='source' position={Position.Bottom} />
    </>
  )
}

export default InputNode
