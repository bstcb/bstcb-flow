import { Handle, NodeProps, Position } from 'reactflow'
import './WhileLoopNode.scss'
import { DefaultNodeProps } from '../../../../types/defaultNodeProps'
import { useCallback } from 'react'

interface WhileLoopNodeProps extends DefaultNodeProps {}

const WhileLoopNode = (props: NodeProps<WhileLoopNodeProps>) => {
  const onChange = useCallback((e: any) => {}, [])
  return (
    <>
      <Handle type='target' position={Position.Top} />
      <div className='_while_lp_wrapper'>
        <span>No</span>
        <input
          type='text'
          className='_while_lp_input'
          id='_while_lp_value'
          value={props.data.value}
          onChange={onChange}
        />
        <span>Yes</span>
      </div>
      <Handle type='source' id='h_yes' position={Position.Left} />
      <Handle type='source' id='h_no' position={Position.Right} />
    </>
  )
}

export default WhileLoopNode
