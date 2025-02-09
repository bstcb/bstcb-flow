import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
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
import { describeNodePosition } from '../../../../utils/nodeUtils'
import { ErrorKind, ErrorReporter } from '../../../../errors/ErrorReporter'

interface InputNodeProps extends DefaultNodeProps {}

const InputNode = ({ data: props }: NodeProps<InputNodeProps>) => {
    const { setNodes, getNodes, getNode } = useReactFlow()
    const [currentVariable, setCurrentVariable] = useState<Variable>(
        VariableParser.parse(props.value, NodeTokenKind.NTK_INPUT),
    )
    const nodes = getNodes()
    const node = getNode(props.id)!
    const nodeIndex = nodes.indexOf(nodes.find(n => n.id == props.id))!

    const nameInputRef: MutableRefObject<HTMLInputElement> = useRef(null)
    const valueInputRef: MutableRefObject<HTMLInputElement> = useRef(null)


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
        // @TODO: apply timer to error logging
        const newName: string = e.target.value
        if (newName == '') {
            ErrorReporter.show(node.type, nodeIndex, ErrorKind.EK_WRONG_DATA_FORMAT, 'name is empty')
            ErrorReporter.applyErrorStyle(nameInputRef)
        } else {
            ErrorReporter.clearErrorStyle(nameInputRef)
        }
        // @TODO: parse
        setCurrentVariable({ ...currentVariable, name: newName })
    }

    const onChangeValue = (e: any) => {
        const newValue: string = e.target.value
        if (newValue == '') {
            ErrorReporter.show(node.type, nodeIndex, ErrorKind.EK_WRONG_DATA_FORMAT, 'value is empty')
            ErrorReporter.applyErrorStyle(valueInputRef)
        } else {
            ErrorReporter.clearErrorStyle(valueInputRef)
        }
        setCurrentVariable({ ...currentVariable, value: newValue })
    }

    return (
        <>
            <Handle type='target' position={Position.Top} />
            <div className='_input_wrapper'>
                <input
                    ref={nameInputRef}
                    id='_input_variable_name'
                    name='_input_text_name'
                    onChange={onChangeName}
                    value={`${currentVariable.name}`}
                />
                <span>=</span>
                <input
                    ref={valueInputRef}
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
