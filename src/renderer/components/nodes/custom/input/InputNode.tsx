import { useCallback, useEffect, useState } from 'react'
import {
    Handle,
    NodeProps,
    Position,
    applyNodeChanges,
    useEdgesState,
    useNodes,
    useNodesState,
    useReactFlow,
} from 'reactflow'
// #FIXME: long imports
import { DefaultNodeProps } from '../../../../types/defaultNodeProps'
import './InputNode.scss'
import { Variable } from '../../../../types/variable'
import { VariableParser } from '../../../../../transpilers/VariableParser'
import { NodeTokenKind } from '../../../../../transpilers/Token'
import { NodeErrorKind, showNodeError } from '../../../../errors/NodeError'
import { describeNodePosition } from '../../../../utils/nodeUtils'

interface InputNodeProps extends DefaultNodeProps {}

const InputNode = ({ data: props }: NodeProps<InputNodeProps>) => {
    const { setNodes, getNodes, getNode } = useReactFlow()
    const [currentVariable, setCurrentVariable] = useState<Variable>(
        VariableParser.parse(props.value, NodeTokenKind.NTK_INPUT),
    )
    const nodes = getNodes()
    const node = getNode(props.id)!
    const nodeIndex = nodes.indexOf(nodes.find(n => n.id == props.id))!

    useEffect(() => {
        setNodes(nds =>
            nds.map(node => {
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
        console.log('[InputNode.tsx]: all nodes')
        console.log(getNodes())
    }, [currentVariable, setNodes])

    const onChangeName = (e: any) => {
        const newName = e.target.value
        if (newName == '')
            showNodeError(node.type, nodeIndex, NodeErrorKind.NEK_WRONG_DATA_FORMAT, 'name is empty')

        setCurrentVariable({ ...currentVariable, name: newName })
    }

    const onChangeValue = (e: any) => {
        const newValue = e.target.value
        if (newValue == '')
            showNodeError(node.type, nodeIndex, NodeErrorKind.NEK_WRONG_DATA_FORMAT, 'value is empty')

        setCurrentVariable({ ...currentVariable, value: newValue })
    }

    return (
        <>
            <Handle type='target' position={Position.Top} />
            <div className='_input_wrapper'>
                <input
                    id='_input_variable_name'
                    name='_input_text_name'
                    onChange={onChangeName}
                    value={`${currentVariable.name}`}
                />
                <span>=</span>
                <input
                    id='_input_variable_value'
                    name='_input_text_value'
                    onChange={onChangeValue}
                    value={`${currentVariable.value}`}
                />
            </div>
            <Handle type='source' position={Position.Bottom} />
        </>
    )
}

export default InputNode
