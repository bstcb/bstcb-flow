import { Handle, Position } from 'reactflow'
import './IfConditionEndNode.scss'

const IfConditionEndNode = () => {
    return <>
        <Handle type='target' position={Position.Top} style={{ zIndex: 999, transform: 'translate(-3px, -90%)' }} />
        <div className='_if_cond_wrapper'>
            <input
                type='text'
                className='_if_cond_input'
                id='_if_cond_value'
                value={'If Condition End'}
                readOnly
            />
        </div>
        <Handle type='source' position={Position.Bottom} style={{ zIndex: 999, transform: 'translate(-3px, 90%)' }} />
    </>
}

export default IfConditionEndNode
