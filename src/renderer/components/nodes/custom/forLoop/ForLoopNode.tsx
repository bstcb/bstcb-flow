import { Handle, NodeProps, Position } from 'reactflow'
import { DefaultNodeProps } from '../../../../types/defaultNodeProps'
import './ForLoopNode.scss'
import { useCallback } from 'react'

interface ForLoopNodeProps extends DefaultNodeProps {}

const ForLoopNode = (props: NodeProps<ForLoopNodeProps>) => {
  const onChange = useCallback((e: any) => {}, [])
  return (
    <>
      <Handle type='target' position={Position.Top} />
      <div className='_for_lp_wrapper'>
        <span>No</span>
        <input
          type='text'
          className='_for_lp_input'
          id='_for_lp_value'
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

export default ForLoopNode
