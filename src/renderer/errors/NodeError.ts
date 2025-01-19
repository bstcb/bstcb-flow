import { Node, ReactFlowInstance } from 'reactflow'

export enum NodeErrorKind {
  NEK_WRONG_DATA_FORMAT = "wrong data format"
} 

  
export function showNodeError(nodeType: string, nodeIndex: number, errorKind: NodeErrorKind, errorMessage: string) {
  alert(`[ERROR]: ${errorKind}: ${errorMessage} in ${nodeType} node at position ${nodeIndex}`)
}
  
  



