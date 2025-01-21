import { MutableRefObject } from "react"
import { NODE_ERROR_CLASSNAME } from "../constants"
import { useErrorStore } from "../store/ErrorStore"

export enum NodeErrorKind {
  NEK_WRONG_DATA_FORMAT = "wrong data format"
}

export class NodeError {
  // @NOTE: forced to accept all the parameters here 'cause of React Hook rules
  static show(nodeType: string, nodeIndex: number, errorKind: NodeErrorKind, errorMessage: string) {
    const errorString = `[ERROR]: ${errorKind}: ${errorMessage} in ${nodeType} node at position ${nodeIndex}`
    useErrorStore.getState().setIsNodeDataFormatError(errorString)
  }

  static applyErrorStyle(ref: MutableRefObject<HTMLInputElement>) {
    if (!ref.current.className.includes(NODE_ERROR_CLASSNAME))
      ref.current.className = NODE_ERROR_CLASSNAME
  }


  static clearErrorStyle(ref: MutableRefObject<HTMLInputElement>) {
    if (ref.current.className.includes(NODE_ERROR_CLASSNAME))
      ref.current.className = ''
  }

}



