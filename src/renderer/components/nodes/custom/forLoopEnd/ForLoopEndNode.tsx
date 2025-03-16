import { Handle, Position } from 'reactflow'
import './ForLoopEndNode.scss'

const ForLoopEndNode = () => {
    return <>
        <Handle type='target' position={Position.Top} style={{ zIndex: 999, transform: 'translate(-3px, -90%)' }} />
        <div className='_for_lp_end_wrapper'>
            <input
                type='text'
                className='_for_lp_end_input'
                id='_for_lp_end_value'
                value={'For Loop End'}
                readOnly
            />
        </div>
        <Handle type='source' position={Position.Bottom} style={{ zIndex: 999, transform: 'translate(-3px, 90%)' }} />
    </>
}

export default ForLoopEndNode
