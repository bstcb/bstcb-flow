import { useCallback, useEffect, useState } from 'react'
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow'
import './ForLoopNode.scss'
import { DefaultNodeProps } from '../../../../types/defaultNodeProps'
import { NodeTokenKind } from '../../../../../transpilers/Token'
import { VariableParser } from '../../../../../transpilers/VariableParser'
import { Variable } from '../../../../types/variable'


interface ForLoopNodeProps extends DefaultNodeProps {}

const ForLoopNode = ({ data: props }: NodeProps<ForLoopNodeProps>) => {
    const { setNodes, getNodes } = useReactFlow()

    const [currentVariable, SetCurrentVariable] = useState<Variable>(
        VariableParser.parse(props.value, NodeTokenKind.NTK_FOR_LOOP)
    )

    const onChange = useCallback((e: any) => {
        SetCurrentVariable(
            VariableParser.parse(e.target.value, NodeTokenKind.NTK_FOR_LOOP)
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
