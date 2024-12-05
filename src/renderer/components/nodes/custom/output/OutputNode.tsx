import { useCallback, useState } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'

import { DefaultNodeProps } from '../../../../types/defaultNodeProps'
import './OutputNode.scss'
import { VariableParser } from '../../../../../transpilers/VariableParser'
import { NodeTokenKind } from '../../../../../transpilers/Token'

interface OutputNodeProps extends DefaultNodeProps {}

const OutputNode = ({ data: props }: NodeProps<OutputNodeProps>) => {
	const onVariablesChange = useCallback((e: any) => {
		SetCurrentVariable(
			VariableParser.parse(e.target.value, NodeTokenKind.NTK_OUTPUT),
		)
		// console.log(currentVariable)
	}, [])

	// console.log(props)
	// console.log(variableFromValue(props.value))
	const [currentVariable, SetCurrentVariable] = useState(
		VariableParser.parse(props.value, NodeTokenKind.NTK_OUTPUT),
	)
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
