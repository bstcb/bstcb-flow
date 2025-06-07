import { Handle, Position } from 'reactflow'
import './ForLoopEndNode.scss'
import { useTranslation } from 'react-i18next'

const ForLoopEndNode = () => {
  const { t } = useTranslation()

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        style={{ zIndex: 999, transform: 'translate(-3px, -90%)' }}
      />
      <div className='_for_lp_end_wrapper'>
        <input
          type='text'
          className='_for_lp_end_input'
          id='_for_lp_end_value'
          value={t('MENU_NODES_FOR_END')}
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

export default ForLoopEndNode
