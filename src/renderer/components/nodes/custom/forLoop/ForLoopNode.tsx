import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow'
import './ForLoopNode.scss'
import { DefaultNodeProps } from '../../../../types/defaultNodeProps'
import { NodeTokenKind } from '../../../../../transpilers/Token'
import { VariableParser } from '../../../../../transpilers/VariableParser'
import { Variable } from '../../../../types/variable'
import { NodeError, NodeErrorKind } from '../../../../errors/NodeError'


interface ForLoopNodeProps extends DefaultNodeProps {}

const ForLoopNode = ({ data: props }: NodeProps<ForLoopNodeProps>) => {
    const { setNodes, getNodes, getNode } = useReactFlow()

    const node = getNode(props.id)
    const nodes = getNodes()
    const nodeIndex = nodes.indexOf(nodes.find(n => n.id == props.id))!

    const inputRef: MutableRefObject<HTMLInputElement> = useRef(null)

    const [currentVariable, SetCurrentVariable] = useState<Variable>(
        VariableParser.parse(props.value, NodeTokenKind.NTK_FOR_LOOP)
    )

    const onChange = useCallback((e: any) => {
        let value: string = e.target.value
        let forLoopRegex = new RegExp(/let\s+\w\s*=\s*\w;\s*\w\s*<\s*\w;\s*\w.*/)
        console.log(value, typeof value)
        console.log(forLoopRegex)
        if (value == '') {
            NodeError.show(node.type, nodeIndex, NodeErrorKind.NEK_WRONG_DATA_FORMAT, 'value is empty')
            NodeError.applyErrorStyle(inputRef)
        }
        else if (!value.test(forLoopRegex)) {
            NodeError.show(node.type, nodeIndex, NodeErrorKind.NEK_WRONG_DATA_FORMAT, 'wrong value format')
            NodeError.applyErrorStyle(inputRef)
        } else {
            NodeError.clearErrorStyle(inputRef)
        }

        SetCurrentVariable(
            VariableParser.parse(value, NodeTokenKind.NTK_FOR_LOOP)
        )
    }, [])

    useEffect(() => {
        console.log(props)
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
        console.log('[ForLoopNode.tsx]: all nodes')
        console.log(getNodes())
    }, [currentVariable, setNodes])

    return (
        <>
            <Handle type='target' position={Position.Top} />
            <div className='_for_lp_wrapper'>
                <span>No</span>
                <input
                    ref={inputRef}
                    type='text'
                    className='_for_lp_input'
                    id='_for_lp_value'
                    value={currentVariable.value}
                    onChange={onChange}
                />
                <span>Yes</span>
            </div>
            <Handle type='source' id='h_yes' position={Position.Left} />
            <Handle type='source' id='h_no' position={Position.Right} />
        </>
    )
}

export default ForLoopNode
