import { Handle, Position } from 'reactflow'
import './IfConditionEndNode.scss'
import { useTranslation } from 'react-i18next'

const IfConditionEndNode = () => {
  const { t } = useTranslation()

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        style={{ zIndex: 999, transform: 'translate(-3px, -90%)' }}
      />
      <div className='_if_cond_end_wrapper'>
        <textarea
          wrap='soft'
          className='_if_cond_end_input'
          id='_if_cond_end_value'
          value={t('MENU_NODES_IF_END')}
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

export default IfConditionEndNode
