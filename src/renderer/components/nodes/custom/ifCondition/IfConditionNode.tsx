import { useCallback } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import './IfConditionNode.scss'
import { DefaultNodeProps } from '../../../../types/defaultNodeProps'

interface IfConditionNodeProps extends DefaultNodeProps {}

const IfConditionNode = (props: NodeProps<IfConditionNodeProps>) => {
  const onChange = useCallback((e: any) => {}, [])
  return (
    <>
      <Handle type='target' position={Position.Top} />
      <div className='_if_cond_wrapper'>
        <span>True</span>
        <input
          type='text'
          className='_if_cond_input'
          id='_if_cond_value'
          value={props.data.value}
          onChange={onChange}
        />
        <span>False</span>
      </div>
      <Handle type='source' id='h_true' position={Position.Left} />
      <Handle type='source' id='h_false' position={Position.Right} />
    </>
  )
}

export default IfConditionNode
