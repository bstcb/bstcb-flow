import { useCallback, useState } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'

import { DefaultNodeProps } from '../../../../types/defaultNodeProps'
import './OutputNode.scss'

interface OutputNodeProps extends DefaultNodeProps {}

const OutputNode = ({ data: props }: NodeProps<OutputNodeProps>) => {
  const onVariablesChange = useCallback((e: any) => {
    SetCurrentVariable(variableFromValue(e.target.value))
    // console.log(currentVariable)
  }, [])

  // console.log(props)
  // console.log(variableFromValue(props.value))
  const [currentVariable, SetCurrentVariable] = useState(
    variableFromValue(props.value),
  )
  return (
    <>
      <Handle type='target' position={Position.Top} />
      <div className='_output_wrapper'>
        <input
          type='text'
          value={currentVariable}
          onChange={onVariablesChange}
        />
      </div>
      <Handle type='source' position={Position.Bottom} />
    </>
  )
}

export default OutputNode
