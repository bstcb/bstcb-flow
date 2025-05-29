import { useCallback, useEffect, useState } from 'react'
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow'

import { DefaultNodeProps } from '../../../../types/defaultNodeProps'
import './OutputNode.scss'
import { VariableParser } from '../../../../../transpilers/VariableParser'
import { NodeTokenKind } from '../../../../../transpilers/Token'
import { Variable } from '../../../../types/variable'

interface OutputNodeProps extends DefaultNodeProps {}

const OutputNode = ({ data: props }: NodeProps<OutputNodeProps>) => {
  const { setNodes, getNodes } = useReactFlow()
  const onVariablesChange = useCallback((e: any) => {
    SetCurrentVariable(
      VariableParser.parse(e.target.value, NodeTokenKind.NTK_OUTPUT),
    )
  }, [])

  // console.log(props)
  // console.log(props.value.name)
  // console.log(VariableParser.parse(props.value.name))
  const [currentVariable, SetCurrentVariable] = useState<Variable>(
    VariableParser.parse(props.value, NodeTokenKind.NTK_OUTPUT),
  )
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        console.log(props)
        console.log(node.id === props.id)
        if (node.id === props.id) {
          console.log('node.data before')
          console.log(node.data)
          console.log(currentVariable)
          console.log('node.data after')
          console.log({
            ...node,
            data: {
              ...node.data,
              value: currentVariable,
            },
          })

          return {
            ...node,
            data: {
              ...node.data,
              value: currentVariable,
            },
          }
        }

        return node
      }),
    )
    // @TODO: implement update in NodeStore
    console.log('[OutputNode.tsx]: all nodes')
    console.log(getNodes())
  }, [currentVariable, setNodes])
  return (
    <>
      <Handle type='target' position={Position.Top} />
      <div className='_output_wrapper'>
        <input
          type='text'
          value={currentVariable.value}
          onChange={onVariablesChange}
        />
      </div>
      <Handle type='source' position={Position.Bottom} />
    </>
  )
}

export default OutputNode
