import { Handle, Position } from 'reactflow'
import './WhileLoopEndNode.scss'

const WhileLoopEndNode = () => {
  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        style={{ zIndex: 999, transform: 'translate(-3px, -90%)' }}
      />
      <div className='_while_lp_end_wrapper'>
        <input
          type='text'
          className='_while_lp_end_input'
          id='_while_lp_end_value'
          value={'While Loop End'}
          readOnly
        />
      </div>
      <Handle
        type='source'
        position={Position.Bottom}
        style={{ zIndex: 999, transform: 'translate(-3px, 90%)' }}
      />
    </>
  )
}

export default WhileLoopEndNode
